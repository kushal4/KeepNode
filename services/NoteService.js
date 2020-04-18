const NoteMysqlRepository = require("../repositories/mysql/NoteRepository");
const NoteMongoRepository = require("../repositories/mongo/NoteRepository");
const db_config = require("../config/db_conf");
class NoteService {

    constructor() {
        this.noteRepo = null;
        if (db_config.db_dialect == "mongo") {
            this.noteRepo = new NoteMongoRepository();
        } else {
            this.noteRepo = new NoteMysqlRepository();
        }
    }
    async save(note_obj) {
        let note_saved = await this.noteRepo.save(note_obj);
        return note_saved;
    }

    async bulkSave(note_arr) {
        let notes_saved = await Note.bulkCreate(note_arr);
        return notes_saved;
    }

    async findAll(note_query) {
        let notes_list = await this.noteRepo.findAll(note_query);
        return notes_list;
    }

    async remove(wherQuery = {}) {
        let rowsDeleted = await this.noteRepo.remove(wherQuery);
        return rowsDeleted;
    }

    async update(updateQuery, whereQuery) {
        let updated_result_len = await this.noteRepo.update(updateQuery, whereQuery);
        return updated_result_len;
    }
}

module.exports = NoteService;