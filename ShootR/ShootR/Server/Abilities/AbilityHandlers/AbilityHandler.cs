using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class AbilityHandler
    {
        private Dictionary<string, Ability> _abilityList;

        public AbilityHandler(params Ability[] abilityList)
        {
            _abilityList = new Dictionary<string, Ability>();

            foreach (Ability ability in abilityList)
            {
                _abilityList.Add(ability.Name, ability);
            }
        }

        public Dictionary<string, Ability> Abilities()
        {
            return _abilityList;
        }

        public Ability Ability(string abilityName)
        {
            return _abilityList[abilityName];
        }

        public void AddAbility(Ability ability)
        {
            _abilityList.Add(ability.Name, ability);
        }

        public void Activate(string abilityName)
        {
            if (_abilityList.ContainsKey(abilityName))
            {
                _abilityList[abilityName].Activate();
            }
        }

        public void Deactivate(string abilityName)
        {
            if (_abilityList.ContainsKey(abilityName))
            {
                _abilityList[abilityName].Deactivate();
            }
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