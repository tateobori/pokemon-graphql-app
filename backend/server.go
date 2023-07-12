package main

// https://nishinatoshiharu.com/connect-go-database/
import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/rs/cors"

	"pokemon-graphql/entity"
	"pokemon-graphql/graph"
	"pokemon-graphql/util"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

func open(path string, count uint) (*gorm.DB, error) {
	db, err := gorm.Open("mysql", path)
	if err != nil {
		if count == 0 {
			return nil, fmt.Errorf("retry count over")
		}
		time.Sleep(time.Second)
		count--
		return open(path, count)
	}
	db.DropTable("pokemons")
	db.AutoMigrate(&entity.Pokemon{})
	fmt.Println("db connected!!")

	return db, nil
}

func main() {

	const defaultPort = "8000"
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	user := os.Getenv("MYSQL_USER")
	pass := os.Getenv("MYSQL_PASSWORD")
	host := os.Getenv("MYSQL_HOST")
	dbname := os.Getenv("MYSQL_DATABASE")
	connection := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8&parseTime=True&loc=Local", user, pass, host, dbname)
	//connection := fmt.Sprintf("%s:%s@tcp(127.0.0.1:3306)/%s?charset=utf8&parseTime=True&loc=Local", "user", "password", "pokemon_db")

	db, err := open(connection, 100)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	mux := http.NewServeMux()

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{DB: db}}))
	handler := cors.Default().Handler(mux)
	mux.Handle("/", playground.Handler("GraphQL playground", "/query"))

	util.CreatePokemonData(db)

	mux.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))

}

// https://zenn.dev/murasaki/articles/fbf7efa744ffa3
