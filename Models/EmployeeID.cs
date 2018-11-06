using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeesSampleApplication.Models
{
    public class EmployeeID
    {
        [Key]
        public int id { get; set; }
        public int[] ids { get; set; }
    }
}
