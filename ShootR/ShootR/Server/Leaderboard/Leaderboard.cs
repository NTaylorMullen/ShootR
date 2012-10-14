using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SignalR;

namespace ShootR
{
    public class Leaderboard
    {
        public const int LEADERBOARD_SIZE = 10;
        public const string LEADERBOARD_REQUESTEE_GROUP = "LeaderboardRequestees";

        private UserHandler _userHandler;

        public Leaderboard(UserHandler userHandler)
        {
            _userHandler = userHandler;
        }

        public void RequestLeaderboard(string connectionId)
        {
            dynamic Groups = Game.GetGroups();
            Groups.Add(connectionId, LEADERBOARD_REQUESTEE_GROUP);
        }

        public void StopRequestingLeaderboard(string connectionId)
        {
            dynamic Groups = Game.GetGroups();
            Groups.Remove(connectionId, LEADERBOARD_REQUESTEE_GROUP);
        }

        public IEnumerable<LeaderboardEntry> GetAndUpdateLeaderboard()
        {
            IEnumerable<LeaderboardEntry> currentLeaderboard = (from user in _userHandler.GetUsers()
                                                                where !user.Controller
                                                                select user.MyShip).Select(ship => new LeaderboardEntry()
                    {
                        Name = ship.Name,
                        Kills = ship.StatRecorder.Kills,
                        Deaths = ship.StatRecorder.Deaths,
                        HitsDealt = ship.StatRecorder.HitsDealt,
                        HitsTaken = ship.StatRecorder.HitsTaken,
                        DamageDealt = ship.StatRecorder.DamageDealt,
                        DamageTaken = ship.StatRecorder.DamageTaken,
                        KillDeathRatio = ship.StatRecorder.Kills / Math.Max((ship.StatRecorder.Kills + ship.StatRecorder.Deaths), 1),
                        ConnectionID = ship.Host.ConnectionID
                    }).OrderByDescending(entry => entry.Kills).ThenByDescending(entry => entry.KillDeathRatio).ThenByDescending(entry => entry.DamageDealt);

            int i = 1;

            foreach (LeaderboardEntry entry in currentLeaderboard)
            {
                _userHandler.GetUser(entry.ConnectionID).CurrentLeaderboardPosition = i++;
            }

            return currentLeaderboard.Take(LEADERBOARD_SIZE);
        }
    }
}