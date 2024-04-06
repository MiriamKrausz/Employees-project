using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Employees.Data.Migrations
{
    public partial class jwt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePosition_Employees_EmployeeId",
                table: "EmployeePosition");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePosition_Positions_PositionId",
                table: "EmployeePosition");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EmployeePosition",
                table: "EmployeePosition");

            migrationBuilder.RenameTable(
                name: "EmployeePosition",
                newName: "EmployeePositions");

            migrationBuilder.RenameIndex(
                name: "IX_EmployeePosition_PositionId",
                table: "EmployeePositions",
                newName: "IX_EmployeePositions_PositionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmployeePositions",
                table: "EmployeePositions",
                columns: new[] { "EmployeeId", "PositionId" });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePositions_Employees_EmployeeId",
                table: "EmployeePositions",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePositions_Positions_PositionId",
                table: "EmployeePositions",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePositions_Employees_EmployeeId",
                table: "EmployeePositions");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePositions_Positions_PositionId",
                table: "EmployeePositions");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EmployeePositions",
                table: "EmployeePositions");

            migrationBuilder.RenameTable(
                name: "EmployeePositions",
                newName: "EmployeePosition");

            migrationBuilder.RenameIndex(
                name: "IX_EmployeePositions_PositionId",
                table: "EmployeePosition",
                newName: "IX_EmployeePosition_PositionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmployeePosition",
                table: "EmployeePosition",
                columns: new[] { "EmployeeId", "PositionId" });

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePosition_Employees_EmployeeId",
                table: "EmployeePosition",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePosition_Positions_PositionId",
                table: "EmployeePosition",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
