$WORKSPACE = Join-Path $PSScriptRoot ".." -Resolve

$PROTO_PATH = "https://raw.github.com/mee6aas/zeep/master/api/proto/v1/"
$PROTO_FILE = "invokee.proto"

$OUT = "$WORKSPACE\src\lib\api\proto\invokee\v1\"

$GRPC_TOOLS_NODE_PROTOC_PATH = "$WORKSPACE\node_modules\.bin\grpc_tools_node_protoc.cmd"
$PROTOC_NODE_PLUGIN_PATH = "$WORKSPACE\node_modules\.bin\grpc_tools_node_protoc_plugin.cmd"
$PROTOC_GEN_TS_PATH = "$WORKSPACE\node_modules\.bin\protoc-gen-ts.cmd"

if ($null -eq (Get-Command protoc.exe -ErrorAction SilentlyContinue)) {
    Write-Error "Failed to get protoc.exe. Please install protoc.exe or add to PATH if you already have one."
    Break
}

if (!(Test-Path $PROTOC_NODE_PLUGIN_PATH) -or !(Test-Path $PROTOC_GEN_TS_PATH)) {
    Write-Error "Dev tools not exist. Did you do 'npm install'? "
    Break
}

Get-ChildItem -Path $OUT -File | ForEach-Object { $_.Delete() }

$SRC_TMP = New-TemporaryFile | ForEach-Object { Remove-Item $_; New-Item -ItemType Directory -Path $_ }
$OUT_TMP = New-TemporaryFile | ForEach-Object { Remove-Item $_; New-Item -ItemType Directory -Path $_ }

foreach ($proto in $PROTO_FILE) {
    Invoke-WebRequest -Uri $PROTO_PATH$proto -OutFile $(Join-Path $SRC_TMP $proto)
}

& $GRPC_TOOLS_NODE_PROTOC_PATH `
    --proto_path=$SRC_TMP `
    --plugin="protoc-gen-grpc=$PROTOC_NODE_PLUGIN_PATH" `
    --js_out="import_style=commonjs,binary:$OUT_TMP" `
    --grpc_out=$OUT_TMP `
$(Get-Item $SRC_TMP\*)

protoc.exe `
    --proto_path=$SRC_TMP `
    --plugin="protoc-gen-ts=$PROTOC_GEN_TS_PATH" `
    --ts_out=$OUT_TMP `
$(Get-Item $SRC_TMP\*)

Move-Item $OUT_TMP\* $OUT

Remove-Item $SRC_TMP -Confirm:$false -Force -Recurse
Remove-Item $OUT_TMP -Confirm:$false -Force -Recurse
