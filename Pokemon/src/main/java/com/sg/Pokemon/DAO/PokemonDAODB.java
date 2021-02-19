package com.sg.Pokemon.DAO;

import com.sg.Pokemon.Model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class PokemonDAODB implements PokemonDAO {

    @Autowired
    JdbcTemplate jdbc;

    public static final class PokemonMapper implements RowMapper<Pokemon> {

        @Override
        public Pokemon mapRow(ResultSet rs, int index) throws SQLException {
            Pokemon pk = new Pokemon();

            pk.setUniqueID(rs.getInt("unique_ID"));
            pk.setPokeID(rs.getInt("poke_ID"));
            pk.setUserID(rs.getInt("user_ID"));
            pk.setAbilityID(rs.getInt("ability_ID"));
            pk.setLevel(rs.getInt("level"));
            pk.setMoveID_1(rs.getInt("move_ID1"));
            pk.setMoveID_2(rs.getInt("move_ID2"));
            pk.setMoveID_3(rs.getInt("move_ID3"));
            pk.setMoveID_4(rs.getInt("move_ID4"));
            pk.setHP(rs.getInt("hp"));
            pk.setAttack(rs.getInt("attack"));
            pk.setDefense(rs.getInt("defense"));
            pk.setSpeed(rs.getInt("speed"));
            pk.setSpAttack(rs.getInt("spAttack"));
            pk.setSpDefense(rs.getInt("spDefense"));

            return pk;
        }
    }

    public static final class PokemonMapper2 implements RowMapper<Pokemon> {

        @Override
        public Pokemon mapRow(ResultSet rs, int index) throws SQLException {
            Pokemon pk = new Pokemon();

            pk.setUniqueID(rs.getInt("unique_ID"));
            pk.setUserID(rs.getInt("user_ID"));
            pk.setPokeID(rs.getInt("poke_ID"));
            pk.setAbilityID(rs.getInt("ability_ID"));
            pk.setLevel(rs.getInt("level"));

            return pk;
        }
    }

    public static final class TypeMapper implements RowMapper<Type> {
        @Override
        public Type mapRow(ResultSet rs, int index) throws SQLException {
            Type ty = new Type();
            ty.setType_ID(rs.getInt("type_ID"));
            ty.setTypeName(rs.getString("typeName"));
            return ty;
        }
    }

    public static final class MovesMapper implements RowMapper<Moves> {
        @Override
        public Moves mapRow(ResultSet rs, int index) throws SQLException {
            Moves mv = new Moves();
            mv.setMove_ID(rs.getInt("move_ID"));
            mv.setMoveName(rs.getString("moveName"));
            return mv;
        }
    }

    public static final class MovesMapper2 implements RowMapper<Moves> {
        @Override
        public Moves mapRow(ResultSet rs, int index) throws SQLException {
            Moves mv = new Moves();
            mv.setMove_ID(rs.getInt("move_ID"));
            return mv;
        }
    }

    public static final class AbilityMapper implements RowMapper<Ability> {
        @Override
        public Ability mapRow(ResultSet rs, int index) throws SQLException {
            Ability ab = new Ability();
            ab.setAbility_ID(rs.getInt("ability_ID"));
            ab.setAbility(rs.getString("ability"));
            return ab;
        }
    }

    public static final class AbilityMapper2 implements RowMapper<Ability> {
        @Override
        public Ability mapRow(ResultSet rs, int index) throws SQLException {
            Ability ab = new Ability();
            ab.setAbility_ID(rs.getInt("ability_ID"));
            return ab;
        }
    }

    public static final class NamesMapper implements RowMapper<Names> {
        @Override
        public Names mapRow(ResultSet rs, int index) throws SQLException {
            Names na = new Names();
            na.setPokemonName(rs.getString("name"));
            return na;
        }
    }

    public static final class NamesMapper2 implements RowMapper<Names> {
        @Override
        public Names mapRow(ResultSet rs, int index) throws SQLException {
            Names na = new Names();
            na.setPokeName_ID(rs.getInt("poke_ID"));
            return na;
        }
    }

    @Override
    public List<Pokemon> getAllPokemon() {

        final String SELECT_ALL_POKEMON = "SELECT * FROM pokemon";

        return jdbc.query(SELECT_ALL_POKEMON, new PokemonMapper());
    }

    @Override
    public Pokemon getPokemonByUniqueID(int unique_ID) {

        try {

            final String SELECT_POKEMON_BY_ID = "SELECT * FROM pokemon WHERE unique_ID = ?";

            return jdbc.queryForObject(SELECT_POKEMON_BY_ID, new PokemonMapper(), unique_ID);
        } catch (DataAccessException ex) {

            return null;
        }
    }

    @Override
    public List<Pokemon> searchPokemon(int poke_ID) {
        final String SEARCH = "Select user_ID, unique_ID, poke_ID, ability_ID, level from Pokemon WHERE poke_ID = ?";
        List<Pokemon> pokemon = jdbc.query(SEARCH, new PokemonMapper2(), poke_ID);
        return pokemon;
    }

    @Override
    public List<Pokemon> getPokemonByUser(String username) {

        try {

            final String SELECT_POKEMON_BY_USER = "Select unique_ID, pokemon.poke_ID, pokemon.user_ID, level, ability_ID, move_ID1, move_ID2, move_ID3, move_ID4, hp, attack, defense, speed, spAttack, spDefense FROM pokemon "
                    + "INNER JOIN users ON pokemon.user_ID = users.user_ID WHERE userName = ?";

            List<Pokemon> pokemon = jdbc.query(SELECT_POKEMON_BY_USER, new PokemonMapper(), username);
            return pokemon;
        } catch (DataAccessException ex) {

            return null;
        }
    }

    @Override
    @Transactional
    public List<Type> getTypeByPokemonID(int poke_ID) {
        final String SELECT_TYPE_BY_ID = "SELECT type_ID, typeName FROM types "
                + "RIGHT JOIN pokemonNames ON types.type_ID = pokemonNames.type_ID1 OR types.type_ID = pokemonNames.type_ID2 WHERE poke_ID = ?";

        return jdbc.query(SELECT_TYPE_BY_ID, new TypeMapper(), poke_ID);
    }

    @Override
    public Ability getPokemonAbilityByPokemonID(int poke_ID) {
        try {
            final String SELECT_POKEMON_ABILITY = "SELECT ability_ID, ability FROM abilities WHERE ability_ID = ?";
            return jdbc.queryForObject(SELECT_POKEMON_ABILITY, new AbilityMapper(), poke_ID);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public Ability getPokemonAbilityIDByName(String ability_name) {
        final String SELECT_POKEMON_ABILITY = "SELECT ability_ID FROM abilities WHERE ability = ?";
        return jdbc.queryForObject(SELECT_POKEMON_ABILITY, new AbilityMapper2(), ability_name);
    }

    @Override
    public Moves getPokemonMoveIDByName(String move_name) {
        try {
            final String SELECT_POKEMON_MOVE = "SELECT move_ID FROM moves WHERE moveName = ?";
            return jdbc.queryForObject(SELECT_POKEMON_MOVE, new MovesMapper2(), move_name);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<Moves> getPokemonMoves(int unique_ID) {
        try {
            final String SELECT_POKEMON_MOVE = "SELECT move_ID, moveName FROM moves "
                    + "RIGHT JOIN pokemon ON moves.move_ID = pokemon.move_ID1 OR moves.move_ID = pokemon.move_ID2 OR moves.move_ID = pokemon.move_ID3 OR moves.move_ID = pokemon.move_ID4 WHERE unique_ID = ?";
            return jdbc.query(SELECT_POKEMON_MOVE, new MovesMapper(), unique_ID);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public Names getPokemonNameByID(int unique_ID) {
        try {
            final String SELECT_POKEMON_BY_ID = "SELECT name FROM pokemonNames WHERE poke_ID = ?";
            return jdbc.queryForObject(SELECT_POKEMON_BY_ID, new NamesMapper(), unique_ID);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public Names getPokemonIDByName(String name) {
        try {
            final String SELECT_POKEMON_BY_NAME = "SELECT poke_ID FROM pokemonNames WHERE name = ?";
            return jdbc.queryForObject(SELECT_POKEMON_BY_NAME, new NamesMapper2(), name);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    @Transactional
    public Pokemon addPokemon(Pokemon pokemon) {
        final String INSERT_POKEMON = "INSERT INTO pokemon(poke_ID, user_ID, level, ability_ID, move_ID1, move_ID2, move_ID3, move_ID4, hp, attack, defense, speed, spAttack, spDefense) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbc.update(INSERT_POKEMON, pokemon.getPokeID(), pokemon.getUserID(), pokemon.getLevel(),
                pokemon.getAbilityID(), pokemon.getMoveID_1(), pokemon.getMoveID_2(), pokemon.getMoveID_3(),
                pokemon.getMoveID_4(), pokemon.getHP(), pokemon.getAttack(), pokemon.getDefense(), pokemon.getSpeed(),
                pokemon.getSpAttack(), pokemon.getSpDefense());
        int newId = jdbc.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        pokemon.setUniqueID(newId);
        return pokemon;
    }

    @Override
    public void updatePokemon(Pokemon pokemon) {
        final String UPDATE_GAME = "UPDATE pokemon SET level = ?, hp = ?, attack = ?, defense = ?, speed = ?, spAttack = ?, spDefense = ?, move_ID1 = ?, move_ID2 = ?, move_ID3 = ?, move_ID4 = ? WHERE unique_ID = ?";
        jdbc.update(UPDATE_GAME, pokemon.getLevel(), pokemon.getHP(), pokemon.getAttack(), pokemon.getDefense(),
                pokemon.getSpeed(), pokemon.getSpAttack(), pokemon.getSpDefense(), pokemon.getMoveID_1(),
                pokemon.getMoveID_2(), pokemon.getMoveID_3(), pokemon.getMoveID_4(), pokemon.getUniqueID());
    }

    @Override
    @Transactional
    public void deletePokemon(int poke_ID) {
        final String DELETE_POKEMON = "DELETE FROM pokemon " + "WHERE unique_ID = ?";
        jdbc.update(DELETE_POKEMON, poke_ID);
    }

    @Override
    public List<Names> getAllPokemonNames() {
        final String SELECT_ALL_POKEMON = "SELECT * FROM pokemonnames";

        return jdbc.query(SELECT_ALL_POKEMON, new NamesMapper());
    }

    @Override
    public List<Ability> getAllAbilities() {
        final String SELECT_ALL_POKEMON = "SELECT * FROM abilities";

        return jdbc.query(SELECT_ALL_POKEMON, new AbilityMapper());
    }

    @Override
    public List<Moves> getAllMoves() {
        final String SELECT_ALL_POKEMON = "SELECT * FROM moves";

        return jdbc.query(SELECT_ALL_POKEMON, new MovesMapper());
    }
}
