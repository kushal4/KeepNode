const NoteValidation = require("../utils/valdation/NoteValidation");
const getErrorObj = require("../utils/valdation/error_validation_obj");
//const NoteRepository = require("../repositories/mysql/NoteRepository");
const btoa = require("btoa");
const NoteService = require("../services/NoteService");
const BSON = require('bson');
class NoteHelper {

    constructor() {
        this.noteRepo = new NoteService();
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

        //console.log(update_query, note_query);
        let updated_result_len = await this.noteRepo.update(update_query, note_query);
        //console.log("updated_result_len :: ", updated_result_len);
        if (updated_result_len > 0) {
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
        let notes_list_mod = notes_list.map(note => {
            if ("_id" in note) {
                // console.log("_id there");
                note.id = note._id.toString();
                delete note._id;
            }
            if (note.image != "" && note.image != null) {
                //console.log("not null");
                //console.log(note.image);
                let note_obj = null;
                //  console.log(Buffer.isBuffer(note.image));
                if (Buffer.isBuffer(note.image)) {
                    // note_obj = BSON.serialize(note.image);
                    note_obj = note.image;
                    //  console.log(note_obj);
                } else {
                    // console.log(note.image.buffer);
                    note_obj = note.image.buffer;
                    // console.log(note_obj);
                }

                let imageURL = 'data:image/png;base64,' + note_obj.toString('base64');
                //console.log(imageURL);
                // var thumbnail = new Buffer(req.body.data).toString('base64');
                //you can store this string value in a mongoose model property, and save to mongodb

                //base64 ---> image
                // var buffer = new Buffer(thumbnail, "base64");
                //console.log(BSON.serialize(note.image));
                note.image = imageURL;
                // note.test = "sfsf";
                //note.image12 = imageURL;
                //console.log(note);
                //console.log('"' + new Buffer("q") + '" converted to Base64 is "' + note.image + '"');
            } else {
                // console.log("delete image");
                //delete note.image;
                note.image = null;
            }
            // console.log(notes_list);
            return note;
        });
        // console.log(notes_list_mod);
        if (Array.isArray(notes_list_mod)) {
            return {
                code: 200,
                notes: notes_list_mod
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