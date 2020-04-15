const NoteValidation = require("../utils/valdation/NoteValidation");
const getErrorObj = require("../utils/valdation/error_validation_obj");
const NoteRepository = require("../repositories/NoteRepository");
class NoteHelper {

    constructor() {
        this.noteRepo = new NoteRepository();
    }
    async save(note_creds) {
        let note_saved = await this.noteRepo.save(note_creds);
        if (note_saved) {
            let note_query = {
                user_id: note_creds.user_id
            };
            let fetch_obj = await this.fetch(note_query);
            return fetch_obj;
        } else {
            return {
                code: 400,
                message: "Note hasnt been saved"
            };
        }
    }

    async update(update_query, note_query) {
        let updated_result = await this.noteRepo.update(update_query, note_query);
        if (updated_result.length > 0) {
            let fetch_query = {
                user_id: note_query.user_id
            };
            let fetch_obj = this.fetch(fetch_query);
            return fetch_obj;
        } else {
            return {
                code: 500,
                message: "Your notes hasnt been marked done or not done"
            };
        }
    }

    async fetch(note_query) {

        let notes_list = await this.noteRepo.findAll(note_query);
        notes_list = notes_list.map(note => {
            if (note.image != "" && note.image != null) {
                let imageURL = 'data:image/png;base64,' + new Buffer(note.image, 'binary').toString('base64');
                note.image = imageURL;
            } else {
                console.log("delete image");
                //delete note.image;
                note.image = null;
            }
            // console.log(note.toJSON());
            return note;
        });
        if (Array.isArray(notes_list)) {
            return {
                code: 200,
                notes: notes_list
            };
        } else {
            return {
                code: 500,
                message: "We can't fetch the notes list something went wrong"
            };
        }
    }

    remove() {

    }

    validate_with_err(note_creds) {
        const { error } = NoteValidation.validateNote(note_creds);
        if (error) {
            let err_obj = getErrorObj(error);
            return {
                code: 400,
                errors: err_obj
            };
        } else {
            return {
                code: 200
            };
        }
    }


}

module.exports = NoteHelper;