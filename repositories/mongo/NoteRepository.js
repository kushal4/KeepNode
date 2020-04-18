const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const Note = require("../../models/mongo/Note");
class NoteRepository {

    async save(note_obj) {
        let note_saved = await Note.create(note_obj);
        return note_saved;
    }

    async bulkSave(note_arr) {
        let notes_saved = await Note.bulkCreate(note_arr);
        return notes_saved;
    }

    async findAll(note_query) {
        let notes_list = await Note.find(note_query, null, { safe: true, new: true }).lean();
        //console.log(notes_list);
        return notes_list;
    }

    async remove(wherQuery = {}) {
        let rowsDeleted = await Note.remove(wherQuery);
        return rowsDeleted;
    }

    async update(updateQuery, whereQuery) {
        whereQuery._id = whereQuery.id;
        delete whereQuery.id;
        // delete whereQuery.user_id;
        //console.log(whereQuery);
        let updated_result = await Note.updateMany(whereQuery, { $set: updateQuery });
        //console.log(updated_result);
        return updated_result.nModified;
    }
}

module.exports = NoteRepository;