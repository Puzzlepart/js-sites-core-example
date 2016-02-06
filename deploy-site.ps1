Param(
	[string]$SiteUrl,
	[string]$Credentials,
    [switch]$CurrentCredentials
)

$sw = [Diagnostics.Stopwatch]::StartNew()

# Default values for development, override using parameters
if(!($Credentials))
{
	$Credentials = $SiteUrl 
}
 
$ErrorActionPreference = "Stop"

# Must run from script location for relative paths to work decently
cd $PSScriptRoot

function PrintSectionHeader([string]$Title) {
    Write-Host ""
    Write-Host "----------------------------------------------------------------------" -ForegroundColor Green
    Write-Host "$Title" -ForegroundColor Green
    Write-Host "----------------------------------------------------------------------" -ForegroundColor Green
    Write-Host ""
}
Write-Host "----------------------------------------------------------------------" -ForegroundColor DarkYellow
Write-Host "Starting site provisioning using Office 365 Dev PnP PowerShell CmdLets" -ForegroundColor DarkYellow
Write-Host "Provisioning templates provided by Puzzlepart (www.puzzlepart.com)" -ForegroundColor DarkYellow
echo ""
Try
{
    if( $CurrentCredentials)
    {
        $Credentials = [Environment]::UserDomainName + "\" + [Environment]::UserName
		echo "Connecting to $($SiteUrl)"
        echo "Using credentials for $($Credentials)"
        Connect-SPOnline $SiteUrl -CurrentCredentials
    }
    else
    {
        # Connect using credentials stored in Windows Credentials Manager, see https://github.com/OfficeDev/PnP-PowerShell
		echo "Connecting to $($SiteUrl)"
        echo "Using credentials for $($Credentials)"
        Connect-SPOnline $SiteUrl -Credentials $Credentials
    }
}
catch [Exception]
{
    echo ""
    Write-Host  "This script uses Office 365 Dev PnP PowerShell CmdLets" -ForegroundColor Red
    Write-Host  "Download and install from https://github.com/OfficeDev/PnP-PowerShell/releases" -ForegroundColor Red
    Write-Host  "Note! You may need to restart your PowerShell console" -ForegroundColor Red
    Write-Host  "----------------------------------------------------------------------" -ForegroundColor Red
    Write-Host $_.Exception -ForegroundColor Red    
    Exit
}
echo ""
Write-Host "----------------------------------------------------------------------" -ForegroundColor DarkYellow

$web = Get-SPOWeb 

PrintSectionHeader -Title "Compiling TypeScript"
Get-ChildItem .\Template\SiteAssets\ts\ | ForEach-Object {
    $ts = $_.FullName;
    $js = $_.FullName.Replace(".ts", ".js");
    $js = $js.Replace("\ts\", "\js\")
    Write-Host "Output: $($js)"
    tsc --out $js $ts | Out-Null
}

PrintSectionHeader -Title "Applying template"
Apply-SPOProvisioningTemplate Template/template.xml -Web $web -ErrorAction Stop

$sw.Stop()
Write-Host ""
Write-Host "----------------------------------------------------------------------" -ForegroundColor DarkYellow
Write-Host "Site provisioning completed in $($sw.Elapsed)" -ForegroundColor DarkYellow
Write-Host "----------------------------------------------------------------------" -ForegroundColor DarkYellow


