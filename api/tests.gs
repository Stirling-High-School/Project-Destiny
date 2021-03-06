/* Please note, this is not a thorough test suite (its anything but that!)
These are instead functions which invoke the get and post endpoints with
query parameters optimal for checking MANUALLY that they either return the
expected response, or update spreadsheet data optimally. If you wish to either
alter the endpoints or test them yourself, I would highly recommend using
something like postman to give you a more real world test case (in all honesty
the main reason these exist, is because it made my life easier when building
out the endpoints) */

function testPostS56() {
  const response = doPost({
    postData: {
      contents: JSON.stringify({
        type: "form-submit",
        data: {
          email: "digitalwizard06@stirlingschools.net",
          name: "Angus Henderson",
          form_class: "6E1",
          choices: [
            {
              subject: "Maths",
              level: "Advanced Higher",
              weight: 1,
            },
            {
              subject: "Computing Science",
              level: "Advanced Higher",
              weight: 1,
            },
            {
              subject: "Physics",
              level: "Advanced Higher",
              weight: 1,
            },
            {
              subject: "Chemistry",
              level: "Higher",
              weight: 2,
            },
            {
              subject: "Music",
              level: "Higher",
              weight: 3,
            },
            {
              subject: "French",
              level: "Higher",
              weight: "Backup",
            },
          ],
          course_choice_id: "s5-6",
          optional_fields: {
            "Planned Destination": "Graduate Apprenticeship",
            "Planned Destination Details":
              "Looking to do a Graduate Apprenticeship in Software Engineering, potentially in fintech",
            "Expected Leaving Date": 2022,
            "Career Aspiration": "Software Engineer",
          },
          wider_achievement_options: [
            "Work Experience (Work Placement SCQF Level 5)",
            "Leadership (SQA Leadership Award Level 6)",
          ],
        },
      }),
    },
  });
  Logger.log(response.getContent());
}

function testPostS45() {
  const response = doPost({
    postData: {
      contents: JSON.stringify({
        type: "form-submit",
        data: {
          email: "digitalwizard06@stirlingschools.net",
          name: "David Beechey",
          form_class: "4N1",
          choices: [
            {
              subject: "Maths",
              level: "Higher",
              weight: 1,
            },
            {
              subject: "Computing Science",
              level: "Higher",
              weight: 1,
            },
            {
              subject: "Physics",
              level: "Higher",
              weight: 1,
            },
            {
              subject: "Music",
              level: "Higher",
              weight: 2,
            },
            {
              subject: "Chemistry",
              level: "Higher",
              weight: 3,
            },
            {
              subject: "French",
              level: "Higher",
              weight: "Backup",
            },
          ],
          course_choice_id: "s4-5",
          optional_fields: {
            "Planned Destination": "Something fun",
            "Planned Destination Details":
              "Looking to do something interesting",
            "Expected Leaving Date": 2022,
            "Career Aspiration": "Fun person",
          },
        },
      }),
    },
  });
  Logger.log(response.getContent());
}

function testGet() {
  const response = doGet({
    parameter: {
      course_choice_id: "s5-6",
      email: "digitalwizard06@stirlingschools.net",
    },
  });
  Logger.log(response.getContent());
}
