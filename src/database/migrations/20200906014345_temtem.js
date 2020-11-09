
exports.up = function(knex) {
  return knex.schema.createTable("temtem", function (table) {
    // table.string("id").nullable();
    table.increments();
    table.string("n").nullable();
    table.string("name").nullable();
    table.string("type_one").nullable();
    table.string("type_two").nullable();
    table.string("hp").nullable();
    table.string("sta").nullable();
    table.string("spd").nullable();
    table.string("atk").nullable();
    table.string("def").nullable();
    table.string("spatk").nullable();
    table.string("spdef").nullable();
    table.string("total").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("temtem");
};
