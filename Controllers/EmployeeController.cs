using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EmployeesSampleApplication.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeesSampleApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private DbConnection connection;

        public EmployeeController() {
            connection = new DbConnection("bolt://localhost:7687","neo4j","6192");
        }

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            List<Employee> employees = connection.getEmployees();
            return employees;
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public String Post([FromBody]Employee e)
        {
            String result = connection.addEmployee(e);
            return result;
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
