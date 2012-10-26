using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class HealthPack : Powerup
    {
        public const int WIDTH = 50;
        public const int HEIGHT = 50;
        public static int HALF_WIDTH = WIDTH / 2;
        public static int HALF_HEIGHT = HEIGHT / 2;

        public const short POWERUP_TYPE = 1;

        public const int HEAL_AMOUNT = 25;
        public static readonly TimeSpan LIFE_SPAN = TimeSpan.FromSeconds(6);

        private DateTime _dieAfter;

        public HealthPack(Vector2 position)
            : base(WIDTH, HEIGHT, new StationaryMovementController(position), new LifeController(), POWERUP_TYPE)
        {
            _dieAfter = DateTime.UtcNow + LIFE_SPAN;
        }

        public override void HandleCollisionWith(Collidable c, Map space)
        {
            if (c is Ship)
            {
                c.LifeController.Heal(HEAL_AMOUNT);
                Dispose(); // Destroy bullet when collision  
                base.HandleCollisionWith(c, space);
            }
        }


        public override void Update(DateTime utcNow)
        {
            // If we should expire
            if (utcNow > _dieAfter)
            {
                _altered = true;
                Dispose();
            }
        }
    }
}