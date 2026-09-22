$action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument '/c "C:\Users\Reza Karim\cembicredit\scripts\run_nightly_snapshot.bat"'
$trigger = New-ScheduledTaskTrigger -Daily -At 9:00PM
Register-ScheduledTask -TaskName "NotionDailySnapshot" -Action $action -Trigger $trigger -Description "Updates Reza Notion Snapshot page nightly" -Force
Write-Host "Windows Scheduled Task 'NotionDailySnapshot' registered successfully!"
