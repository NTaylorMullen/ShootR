using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class ValueRef<T> where T : struct
    {
        public T Value { get; set; }
        public ValueRef(T value) { this.Value = value; }
    }
}