using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class AbilityHandler
    {
        private Dictionary<Type, Ability> _abilityList;

        public AbilityHandler(params Ability[] abilityList)
        {
            _abilityList = new Dictionary<Type, Ability>();

            foreach (Ability ability in abilityList)
            {
                _abilityList.Add(abilityList.GetType(), ability);
            }
        }

        public void AddAbility(Ability ability)
        {
            _abilityList.Add(ability.GetType(), ability);
        }

        public void Activate<T>() where T : Ability
        {
            _abilityList[typeof(T)].Activate();
        }

        public void Update(DateTime utcNow)
        {
            foreach (Ability ability in _abilityList.Values)
            {
                ability.Update(utcNow);
            }
        }
    }
}