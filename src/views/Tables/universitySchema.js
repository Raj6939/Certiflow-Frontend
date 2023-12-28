const universitySchema ={
    type: "https://w3c-ccg.github.io/vc-json-schemas/v1/schema/1.0/schema.json",
    modelVersion: "1.0",
    id: "sch:hid:testnet:z9qrE82BWYA5mD8SMLFxnDJe7DmPD1GxXz2UhpZYQMwxq:1.0",
    name: "University Degree Certificate",
    author: "did:hid:testnet:zEpXp6aev1kSB7V5U33uwxVKJsdpXuqwg8Fqjy1HZgxR6",
    authored: "2023-08-24T16:34:26Z",
    schema: {
      schema: "http://json-schema.org/draft-07/schema",
      description: "University Degree Certificate",
      type: "object",
      properties: "{\"recipientFullName\":{\"type\":\"string\"},\"recipientEmail\":{\"type\":\"string\"},\"degreeType\":{\"type\":\"string\"},\"degreeName\":{\"type\":\"string\"},\"dateOfBirth\":{\"type\":\"date\"},\"degreeEarnedDate\":{\"type\":\"date\"},\"issuerName\":{\"type\":\"string\"},\"enrollmentNumber\":{\"type\":\"string\"}}",
      required: [
        recipientFullName,
        recipientEmail,
        degreeType,
        degreeName,
        dateOfBirth,
        degreeEarnedDate,
        issuerName,
        enrollmentNumber
      ],
      additionalProperties: false
    },
    proof: {
      type: "Ed25519Signature2020",
      created: "2023-08-24T16:34:26Z",
      verificationMethod: "did:hid:testnet:z4CKRAKLNqqo7cXymoPSLtq6cmCbfFfp7SWECybv1D74b#key-1",
      proofPurpose: "assertion",
      proofValue: "r3ZmSUqdtV0NeSq4YTUT41JH0AS1xY6zGiGhQF24kjP9808EuUu2iLCYTLhxs1oe/58XmAuaKFCEu7voqSvABg=="
    }
  }

export default universitySchema