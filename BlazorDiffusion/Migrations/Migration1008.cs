using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;

namespace BlazorDiffusion.Migrations;

public class Migration1008 : MigrationBase
{
    public class CreativeQueue
    {
        [AutoIncrement]
        public int Id { get; set; }
        
        public string RefId { get; set; }
        
        public int UserId { get; set; }
    }
    
    public override void Up()
    {
        Db.CreateTableIfNotExists<CreativeQueue>();
    }

    public override void Down()
    {
        try
        {
            Db.DropTable<CreativeQueue>();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            
        }
    }
}