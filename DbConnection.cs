using Neo4j.Driver.V1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeesSampleApplication.Models;
using Newtonsoft.Json;

namespace EmployeesSampleApplication
{
    public class DbConnection : IDisposable
    {
        private readonly IDriver _driver;
        public DbConnection(String uri, String user,String password) {
            _driver = GraphDatabase.Driver(uri, AuthTokens.Basic(user, password));
        }
        public String addEmployee(Employee e) {
            using (var session = _driver.Session())
            {
                var response = session.WriteTransaction(tx =>
                {
                    var result = tx.Run("CREATE (a:Employee { id:$eid,name:$name,email:$email,phno:$phno,desig:$desig}) Return a.name"
                        ,
                        new { eid=e.id, name=e.name,email=e.email,phno=e.phno,desig=e.desig });
                    return result.Single()[0].As<string>();
                });
                return response;
            }
        }
        public List<Employee> getEmployees() {
            List<Employee> employees = new List<Employee>();
            using (var session = _driver.Session())
            {
                var response = session.WriteTransaction(tx =>
                {
                    var result = tx.Run("MATCH (n:Employee) RETURN n");
                    foreach (var record in result)
                    {
                        var nodeProps = JsonConvert.SerializeObject(record[0].As<INode>().Properties);
                        employees.Add(JsonConvert.DeserializeObject<Employee>(nodeProps));
                    }
                    return employees;
                });
                return response;
            }
        }
        public void Dispose()
        {
            _driver?.Dispose();
        }
    }
}
