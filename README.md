ShootR
======

Multiplayer space ship game powered by [SignalR] (http://www.asp.net/signalr) and [EndGate] (http://endgate.net/).

To play ShootR visit http://shootr.signalr.net/.

In order to run ShootR locally you must do the following:  
  1. If you have VS2012: Install the latest TypeScript version. http://www.microsoft.com/en-us/download/details.aspx?id=34790  
  2. Pull down ShootR source.  
  3. Checkout master.  
  4. Learn [SignalR] (http://www.asp.net/signalr).  
  5. Learn [EndGate] (http://endgate.net).  
  6. Have fun =]  

Feel free to stop by and say hi at http://jabbr.net/#/rooms/ShootR.

**SignalR Source**: https://github.com/SignalR/SignalR  
**EndGate Source**: https://github.com/ntaylormullen/endgate  

###Building for the First Time###
The latest versions of Visual Studio are now cofigured to restore missing packages in solutions that you open, however, ShootR uses packages from a custom package source. 
To restore packages in the ShootR solution, you'll need to make sure that your installation of Visual Studio is configured to [restore missing packages] (http://docs.nuget.org/docs/workflows/using-nuget-without-committing-packages). 

You'll also need to add the nightly build feed from the Asp.Net web stack to your NuGet package sources, which is located here: http://www.myget.org/F/aspnetwebstacknightly/.
You can learn more about adding a custom feed in Visual Studio on the [Nuget docs site] (http://docs.nuget.org/docs/creating-packages/hosting-your-own-nuget-feeds).


