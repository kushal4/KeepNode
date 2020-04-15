const app = require("../../startup/app");
const request = require('supertest');
const NoteRepository = require("../../repositories/NoteRepository");
const expect = require("../utils/expect_utils");

let noteRepo;

beforeEach(() => {
    noteRepo = new NoteRepository();
});

afterEach(async() => {
    await noteRepo.remove();
});

describe("notes routes testing", () => {

    it("tests for the route being called", async() => {
        // const formData = new FormData();
        // formData.append("title", "test");
        // formData.append("image", fs.createReadStream("reviews.png"));
        // try {
        let user_id = 4;
        let res = await request(app)
            .post(`/api/notes/${user_id}`)
            //.field("user_id", 4)
            .field("title", "test")
            .attach("image", "reviews.png");
        //console.log(res.body);
        expect(res.body.notes.length).toBe(1);
        // } catch (ex) {
        //     console.error(ex);
        // }


    });

    //first mock array of notes json to bulksave
    //call the noterepository bulkSave() method for bulksaving
    // call the api for marking a particular note as done
    //verify the particular title has been marked as done by seeing on the response whether 
    //it contains that title with is_done flag to true
    it("can mark as done", async() => {
        let notes_arr = mock_notes_arr();
        let user_id = 4;
        let marked_title = "this is test1";
        let marked_note = await fetch_marked_note(notes_arr, user_id, marked_title);
        let marked_note_id = marked_note[0].id;

        let marked_req = {
            "is_done": true
        };
        let mod_note_response = await request(app)
            .put(`/api/notes/${user_id}/${marked_note_id}`)
            .send(marked_req);
        // console.log(mod_note_response.body);

        expect(mod_note_response.body.notes).toContainObject({
            "title": marked_title,
            "is_done": true
        });

    });

    async function fetch_marked_note(notes_arr, user_id, marked_title) {
        let notes_saved = await noteRepo.bulkSave(notes_arr);
        let notes_response = await getNotes(user_id);
        let notes = notes_response.body.notes;

        let marked_note = notes.filter((note) => {
            if (note.title = marked_title) {
                return note;
            }
        });
        return marked_note;
    }

    function mock_notes_arr() {
        let notes_arr = [{
                "title": "this is test1",
                "user_id": 4
            },
            {
                "title": "this is test2",
                "user_id": 4
            },
            {
                "title": "this is test3",
                "user_id": 4
            }
        ];
        return notes_arr;
    }
    async function getNotes(user_id) {
        let notes_response = await request(app)
            .get(`/api/notes/${user_id}`);
        return notes_response;
    }
});