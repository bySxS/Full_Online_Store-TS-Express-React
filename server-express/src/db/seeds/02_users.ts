/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  // await knex('users').del()
  await knex('users').insert([// pass 123456
    { id: 1, nickname: 'Admin', fullName: 'alexandr', address: 'prospect 202', city: 'zp', rolesId: 1, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'sxs@gmail.com', isActivated: true, isSubscribeToNews: true, avatar: '', activateLink: '', registrationIp: '0.0.0.0' },
    { id: 2, nickname: 'Moder', fullName: 'вася', address: 'prospect 202', city: 'zp', rolesId: 2, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'moder@gmail.com', isActivated: true, isSubscribeToNews: true, avatar: '', activateLink: '', registrationIp: '0.0.0.0' },
    { id: 3, nickname: 'Users', fullName: 'иван иванов', address: 'prospect 202', city: 'zp', rolesId: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users@gmail.com', isActivated: true, isSubscribeToNews: true, avatar: '', activateLink: '', registrationIp: '0.0.0.0' },
    { id: 4, nickname: 'Users2', fullName: 'иван2 иванов', address: 'prospect 202', city: 'zp', rolesId: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users2@gmail.com', isActivated: true, isSubscribeToNews: true, avatar: '', activateLink: '', registrationIp: '0.0.0.0' },
    { id: 5, nickname: 'Users3', fullName: 'иван3 иванов', address: 'prospect 202', city: 'zp', rolesId: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users3@gmail.com', isActivated: true, isSubscribeToNews: true, avatar: '', activateLink: '', registrationIp: '0.0.0.0' },
    { id: 6, nickname: 'Users4', fullName: 'иван4 иванов', address: 'prospect 202', city: 'zp', rolesId: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users4@gmail.com', isActivated: true, isSubscribeToNews: true, avatar: '', activateLink: '', registrationIp: '0.0.0.0' },
    { id: 7, nickname: 'Users5', fullName: 'иван5 иванов', address: 'prospect 202', city: 'zp', rolesId: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users5@gmail.com', isActivated: true, isSubscribeToNews: true, avatar: '', activateLink: '', registrationIp: '0.0.0.0' },
    { id: 8, nickname: 'Users6', fullName: 'иван6 иванов', address: 'prospect 202', city: 'zp', rolesId: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users6@gmail.com', isActivated: true, isSubscribeToNews: true, avatar: '', activateLink: '', registrationIp: '0.0.0.0' },
    { id: 9, nickname: 'Users7', fullName: 'иван7 иванов', address: 'prospect 202', city: 'zp', rolesId: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users7@gmail.com', isActivated: true, isSubscribeToNews: true, avatar: '', activateLink: '', registrationIp: '0.0.0.0' },
    { id: 10, nickname: 'Users8', fullName: 'иван8 иванов', address: 'prospect 202', city: 'zp', rolesId: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users8@gmail.com', isActivated: true, isSubscribeToNews: true, avatar: '', activateLink: '', registrationIp: '0.0.0.0' },
    { id: 11, nickname: 'Users9', fullName: 'иван9 иванов', address: 'prospect 202', city: 'zp', rolesId: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users9@gmail.com', isActivated: true, isSubscribeToNews: true, avatar: '', activateLink: '', registrationIp: '0.0.0.0' },
    { id: 12, nickname: 'Users10', fullName: 'иван10 иванов', address: 'prospect 202', city: 'zp', rolesId: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users10@gmail.com', isActivated: true, isSubscribeToNews: true, avatar: '', activateLink: '', registrationIp: '0.0.0.0' },
    { id: 13, nickname: 'Users11', fullName: 'иван11 иванов', address: 'prospect 202', city: 'zp', rolesId: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users11@gmail.com', isActivated: true, isSubscribeToNews: true, avatar: '', activateLink: '', registrationIp: '0.0.0.0' },
    { id: 14, nickname: 'Users12', fullName: 'иван12 иванов', address: 'prospect 202', city: 'zp', rolesId: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users12@gmail.com', isActivated: true, isSubscribeToNews: true, avatar: '', activateLink: '', registrationIp: '0.0.0.0' },
    { id: 15, nickname: 'Users13', fullName: 'иван13 иванов', address: 'prospect 202', city: 'zp', rolesId: 3, password: '$2a$07$lNyCA97.l8EOy3TmYMPqseCZb.dkF/8KecdV3fFoV0v0qSA3BbDFO', email: 'users13@gmail.com', isActivated: true, isSubscribeToNews: true, avatar: '', activateLink: '', registrationIp: '0.0.0.0' }
  ])
}
