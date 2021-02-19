package com.sg.Pokemon.DAO;

import com.sg.Pokemon.Model.*;

import java.util.List;

public interface PokemonDAO {

    List<Pokemon> getAllPokemon();

    List<Names> getAllPokemonNames();

    Pokemon getPokemonByUniqueID(int unique_ID);

    List<Pokemon> searchPokemon(int poke_ID);

    List<Pokemon> getPokemonByUser(String username);

    List<Type> getTypeByPokemonID(int poke_ID);

    Ability getPokemonAbilityByPokemonID(int poke_ID);

    Ability getPokemonAbilityIDByName(String ability_name);

    Moves getPokemonMoveIDByName(String move_name);

    List<Moves> getPokemonMoves(int unique_ID);

    Names getPokemonNameByID(int unique_ID);

    Names getPokemonIDByName(String name);

    Pokemon addPokemon(Pokemon pokemon);

    void updatePokemon(Pokemon pokemon);

    void deletePokemon(int poke_ID);

    List<Ability> getAllAbilities();

    List<Moves> getAllMoves();

}
