package entity

type Pokemon struct {
	ID        uint `gorm:"primary_key;auto_increment;not_null"`
	PokemonId uint
	Name      string
	Total     uint
	Hp        uint
	Attack    uint
	Defence   uint
	SpAttack  uint
	SpDefence uint
	Speed     uint
}
