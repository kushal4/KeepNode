const Note = require("../../models/mysql/Note");
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
        let notes_list = await Note.findAll({
            where: note_query
        });
        return notes_list;
    }

    async remove(wherQuery = {}) {
        let rowsDeleted = await Note.destroy({
            where: wherQuery
        });
        return rowsDeleted;
    }

    async update(updateQuery, wherQuery) {
        let updated_result = await Note.update(updateQuery, {
            where: wherQuery
        });
        return updated_result.length;
    }
}

module.exports = NoteRepository;