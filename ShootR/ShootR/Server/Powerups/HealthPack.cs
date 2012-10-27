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

        public const int BASE_HEAL_AMOUNT = 25;
        public const double HEAL_INCREASE_PER_LEVEL = .25;

        public static readonly TimeSpan LIFE_SPAN = TimeSpan.FromSeconds(6);

        private int _healAmount;
        private DateTime _dieAfter;

        public HealthPack(Vector2 position, int shipLevel)
            : base(WIDTH, HEIGHT, new StationaryMovementController(position), new LifeController(), new HarmlessDamageController(), POWERUP_TYPE)
        {
            _healAmount = Convert.ToInt32(BASE_HEAL_AMOUNT + (shipLevel-1) * BASE_HEAL_AMOUNT * HEAL_INCREASE_PER_LEVEL);
            _dieAfter = DateTime.UtcNow + LIFE_SPAN;
        }

        public override void HandleCollisionWith(Collidable c, Map space)
        {
            if (c is Ship)
            {
                c.LifeController.Heal(_healAmount);
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