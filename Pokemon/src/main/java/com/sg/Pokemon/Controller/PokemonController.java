package com.sg.Pokemon.Controller;

import com.sg.Pokemon.Model.*;
import com.sg.Pokemon.service.ServiceLayer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/store")
public class PokemonController {

    @Autowired
    ServiceLayer pokemon;

    @CrossOrigin
    @GetMapping("/pokemon")
    public List<Pokemon> getAllPokemon() {
        return pokemon.getAllPokemon();
    }

    @CrossOrigin
    @GetMapping("/names")
    public List<Names> getAllPokemonNames() {
        return pokemon.getAllPokemonNames();
    }

    @CrossOrigin
    @GetMapping("/abilities")
    public List<Ability> getAllAbilities() {
        return pokemon.getAllAbilities();
    }

    @CrossOrigin
    @GetMapping("/moves")
    public List<Moves> getAllMoves() {
        return pokemon.getAllMoves();
    }

    @CrossOrigin
    @GetMapping("/users/{userName}")
    public List<Pokemon> getPokemonByUser(@PathVariable("userName") String userName) {
        return pokemon.getPokemonByUser(userName);
    }

    @CrossOrigin
    @GetMapping("/pokemon/{unique_id}")
    public Pokemon getPokemonByUniqueID(@PathVariable("unique_id") int uniqueID) {
        return pokemon.getPokemonByUniqueID(uniqueID);
    }

    @CrossOrigin
    @GetMapping("/pokemon/byType/{poke_ID}")
    public List<Type> getPokemonByTypeID(@PathVariable("poke_ID") int pokeID) {
        return pokemon.getTypeByPokemonID(pokeID);
    }

    @CrossOrigin
    @GetMapping("/pokemon/byMoves/{unique_ID}")
    public List<Moves> getPokemonByMoves(@PathVariable("unique_ID") int uniqueID) {
        return pokemon.getPokemonMoves(uniqueID);
    }

    @CrossOrigin
    @GetMapping("/moves/{moveName}")
    public Moves getPokemonMoveIDByName(@PathVariable("moveName") String moveName) {
        return pokemon.getPokemonMoveIDByName(moveName);
    }

    @CrossOrigin
    @GetMapping("/pokemon/byAbility/{poke_ID}")
    public Ability getPokemonAbilityByID(@PathVariable("poke_ID") int pokeID) {
        return pokemon.getPokemonAbilityByPokemonID(pokeID);
    }

    @CrossOrigin
    @GetMapping("/abilities/{ability}")
    public Ability getPokemonAbilityIDByName(@PathVariable("ability") String ability) {
        return pokemon.getPokemonAbilityIDByName(ability);
    }

    @CrossOrigin
    @GetMapping("/pokemon/search/{poke_ID}")
    public List<Pokemon> search(@PathVariable("poke_ID") int pokeID) {
        return pokemon.search(pokeID);
    }

    @CrossOrigin
    @GetMapping("/pokemonNames/id/{poke_ID}")
    public Names getPokemonName(@PathVariable("poke_ID") int pokeID) {
        return pokemon.getPokemonNameByID(pokeID);
    }

    @CrossOrigin
    @GetMapping("/pokemonNames/names/{name}")
    public Names getPokemonIDByName(@PathVariable("name") String name) {
        return pokemon.getPokemonIDByName(name);
    }

    @CrossOrigin
    @PutMapping("/alter")
    public Pokemon updatePokemon(@RequestBody Pokemon poke) {
        return pokemon.update(poke);
    }

    @CrossOrigin
    @PostMapping("/add")
    public Pokemon addPokemon(@RequestBody Pokemon poke) {
        return pokemon.addPokemon(poke);
    }

    @CrossOrigin
    @DeleteMapping("/pokemon/{unique_ID}")
    public void deletePokemon(@PathVariable("unique_ID") int uniqueID) {
        pokemon.deletePokemon(uniqueID);
    }

}
