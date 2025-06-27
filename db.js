import { Sequelize, DataTypes } from 'sequelize'

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './banco_visitas.db',
})

export const Visita = sequelize.define('Visita', {
  endereco: { type: DataTypes.STRING, allowNull: false },
  inicio:   { type: DataTypes.TIME,   allowNull: false },
  fim:      { type: DataTypes.TIME,   allowNull: false },
})

//await sequelize.sync();

// if ((await Visita.count()) === 0) {
//   await Visita.create({
//     endereco: 'Av. Brasil, 100',
//     inicio: '09:00:00',
//     fim: '10:00:00',
//   })
// }

export async function init() {
  await sequelize.sync();
}
