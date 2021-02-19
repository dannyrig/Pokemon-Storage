package com.sg.Pokemon.service;

import com.sg.Pokemon.DAO.PokemonDAO;
import com.sg.Pokemon.Model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceLayer {

    @Autowired
    PokemonDAO pokemonDAO;

    public List<Pokemon> getAllPokemon() {
        List<Pokemon> pokemons = pokemonDAO.getAllPokemon();
        return pokemons;
    }

    public List<Names> getAllPokemonNames() {
        List<Names> pokemons = pokemonDAO.getAllPokemonNames();
        return pokemons;
    }

    public List<Ability> getAllAbilities() {
        List<Ability> abilities = pokemonDAO.getAllAbilities();
        return abilities;
    }

    public Pokemon getPokemonByUniqueID(int unique_ID) {
        Pokemon pokemon_unique = pokemonDAO.getPokemonByUniqueID(unique_ID);
        return pokemon_unique;
    }

    public List<Pokemon> getPokemonByUser(String userName) {
        List<Pokemon> userPokemon = pokemonDAO.getPokemonByUser(userName);
        return userPokemon;
    }

    public List<Pokemon> search(int poke_ID) {
        List<Pokemon> results = pokemonDAO.searchPokemon(poke_ID);
        return results;
    }

    public List<Type> getTypeByPokemonID(int poke_ID) {
        List<Type> type = pokemonDAO.getTypeByPokemonID(poke_ID);
        return type;
    }

    public Ability getPokemonAbilityByPokemonID(int poke_ID) {
        Ability ability = pokemonDAO.getPokemonAbilityByPokemonID(poke_ID);
        return ability;
    }

    public List<Moves> getPokemonMoves(int unique_ID) {
        List<Moves> move = pokemonDAO.getPokemonMoves(unique_ID);
        return move;
    }

    public Names getPokemonNameByID(int unique_ID) {
        Names name = pokemonDAO.getPokemonNameByID(unique_ID);
        return name;
    }

    public Ability getPokemonAbilityIDByName(String ability_name) {
        Ability ab = pokemonDAO.getPokemonAbilityIDByName(ability_name);
        return ab;
    }

    public Moves getPokemonMoveIDByName(String move_name) {
        Moves mo = pokemonDAO.getPokemonMoveIDByName(move_name);
        return mo;
    }

    public Names getPokemonIDByName(String name) {
        Names na = pokemonDAO.getPokemonIDByName(name);
        return na;
    }

    public Pokemon addPokemon(Pokemon pokemon) {
        pokemon.setUserID(pokemon.getUserID());
        pokemonDAO.addPokemon(pokemon);
        return pokemon;
    }

    public Pokemon update(Pokemon pokemon) {
        pokemonDAO.updatePokemon(pokemon);
        return pokemonDAO.getPokemonByUniqueID(pokemon.getUniqueID());
    }

    public void deletePokemon(int unique_id) {
        pokemonDAO.deletePokemon(unique_id);
    }

    public List<Moves> getAllMoves() {
        List<Moves> moves = pokemonDAO.getAllMoves();
        return moves;
    }

}
