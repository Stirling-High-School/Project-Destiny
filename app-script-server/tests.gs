/* Please note, this is not a thorough test suite (its anything but that!)
These are instead functions which invoke the get and post endpoints with
query parameters optimal for checking MANUALLY that they either return the
expected response, or update spreadsheet data optimally. If you wish to either
alter the endpoints or test them yourself, I would highly recommend using
something like postman to give you a more real world test case (in all honesty
the main reason these exist, is because it made my life easier when building
out the endpoints) */

function testPost() {
  const response = doPost({
    postData: {
      contents: JSON.stringify({
        type: "form-submit",
        data: {
          email: "angus.henderson@citnow.com",
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
          ],
          course_choice_id: "s45",
          optional_fields: {
            "Planned Destination": "Graduate Apprenticeship",
            "Planned Destination Details":
              "Looking to do a Graduate Apprenticeship in Software Engineering, potentially in fintech",
            "Expected Leaving Date": 2022,
            "Career Aspiration": "Software Engineer",
          },
        },
      }),
    },
  });
  Logger.log(response);
}
