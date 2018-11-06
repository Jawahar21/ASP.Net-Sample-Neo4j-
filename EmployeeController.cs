using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EmployeesSampleApplication.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeesSampleApplication.Controllers
{

    public class EmployeeController : ODataController
    {
        private DbConnection connection;

        public EmployeeController() {
            connection = new DbConnection("bolt://localhost:7687", "neo4j", "6192");
        }

        // GET: api/<controller>
        [EnableQuery]
        public IActionResult Get()
        {
            List<Employee> employees = connection.getEmployees();
            return Ok(employees);
        }

        // POST api/<controller>
        [EnableQuery]
        public IActionResult Post([FromBody]Employee e)
        {
            String result = connection.addEmployee(e);
            return Ok(result);
        }

        // PUT api/<controller>/5
        [EnableQuery]
        public IActionResult Put([FromODataUri] int key,[FromBody]Employee e)
        {
            connection.updateEmployee(e);
            return Ok(e); 
        }

        // DELETE api/<controller>/5
        [ODataRoute("EmployeeID")]
        [EnableQuery]
        public IActionResult Post([FromBody]EmployeeID employeeID)
        {
            //var result = connection.deleteEmployee(employeeID);
            return Ok(employeeID);
        }
    }
}
