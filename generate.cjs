const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageBreak
} = require('docx');
const fs = require('fs');

const border = { style: BorderStyle.SINGLE, size: 1, color: "AAAAAA" };
const borders = { top: border, bottom: border, left: border, right: border };

function hdr(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, bold: true, size: 26, font: "Arial" })]
  });
}

function subHdr(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, bold: true, size: 24, font: "Arial" })]
  });
}

function para(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, font: "Arial", ...opts })]
  });
}

function bold(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 22, font: "Arial" })]
  });
}

function bullet(text, ref = "bullets") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    children: [new TextRun({ text, size: 22, font: "Arial" })]
  });
}

function numbered(text, ref = "numbers") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    children: [new TextRun({ text, size: 22, font: "Arial" })]
  });
}

function sp() { return new Paragraph({ children: [new TextRun("")] }); }

function tableRow(cells, isHeader = false) {
  return new TableRow({
    children: cells.map(c => new TableCell({
      borders,
      shading: isHeader ? { fill: "D0E4FF", type: ShadingType.CLEAR } : { fill: "FFFFFF", type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: c, bold: isHeader, size: 20, font: "Arial" })] })]
    }))
  });
}

function twoColTable(headers, rows) {
  const colW = 4680;
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [colW, colW],
    rows: [
      tableRow(headers, true),
      ...rows.map(r => tableRow(r))
    ]
  });
}

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "numbers",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      }
    ]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "1F497D" },
        paragraph: { spacing: { before: 300, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: "2E74B5" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      // Title
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "INF3202 – Sample Questions: Answers (Q37–Q54)", bold: true, size: 32, font: "Arial", color: "1F497D" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Each question carries 6 marks", size: 22, font: "Arial", italics: true })]
      }),
      sp(),

      // ============================================================
      // Q37
      // ============================================================
      hdr("Q37. Define Authentication Token. Calculate Public Key and Private Key for p = 7 and q = 11 using RSA Algorithm."),
      sp(),
      subHdr("Part A: Authentication Token"),
      para("An authentication token is an extremely useful alternative to a password. It is a small device that generates a new random value every time it is used. This random value becomes the value of authentication."),
      sp(),
      bold("Features of an Authentication Token:"),
      bullet("Processor"),
      bullet("LCD display for displaying outputs"),
      bullet("Battery"),
      bullet("Small keypad for entering information (optional)"),
      bullet("Real-time clock (optional)"),
      sp(),
      subHdr("Part B: RSA Key Calculation (p = 7, q = 11)"),
      numbered("Select two prime numbers: p = 7, q = 11"),
      numbered("Calculate n = p x q = 7 x 11 = 77"),
      numbered("Calculate O(n) = (p-1)(q-1) = 6 x 10 = 60"),
      numbered("Select e such that e is relatively prime to O(n) = 60. Choose e = 7 (gcd(7, 60) = 1)."),
      numbered("Determine d such that (d x e) mod O(n) = 1 => (d x 7) mod 60 = 1. Testing: 7 x 43 = 301 = 5 x 60 + 1. So d = 43."),
      sp(),
      para("Public Key = {e, n} = {7, 77}"),
      para("Private Key = {d, n} = {43, 77}"),
      sp(),

      // ============================================================
      // Q38
      // ============================================================
      hdr("Q38. Explain the Attacks on RSA Algorithm and Discuss its Countermeasures."),
      sp(),
      subHdr("Attacks on RSA"),
      sp(),
      bold("1. Brute Force Attack"),
      para("It involves trying all possible private keys until the correct one is found. Since the key space is enormous, this is computationally very expensive."),
      sp(),
      bold("2. Mathematical Attack"),
      para("It involves factoring the product of two primes. This can be approached in three ways:"),
      bullet("Factor n into its two prime factors p and q, which enables calculation of O(n) and in turn d can be determined."),
      bullet("Determine O(n) directly without finding p and q, which enables determination of d."),
      bullet("Determine d directly without determining O(n)."),
      sp(),
      bold("3. Timing Attack"),
      para("In a timing attack, information about the key or plaintext is obtained by observing how long it takes a given implementation to perform decryption on various cipher texts. It exploits the fact that encryption or decryption often takes slightly different amounts of time on different inputs."),
      sp(),
      subHdr("Countermeasures"),
      sp(),
      bold("1. Against Brute Force Attack:"),
      bullet("The private key should be large in size (e.g., 1024 bits or more) to make brute force computationally infeasible."),
      sp(),
      bold("2. Against Mathematical Attack:"),
      bullet("p and q should differ in length by only a few digits. For a 1024-bit key, p and q should be on the order of magnitude 10^75 to 10^100."),
      bullet("Both (p-1) and (q-1) should contain a large prime factor."),
      bullet("GCD[(p-1),(q-1)] should be small."),
      sp(),
      bold("3. Against Timing Attack:"),
      bullet("Constant Exponentiation Time: Ensure that all exponentiation takes the same amount of time before returning a result."),
      bullet("Random Delay: Add a random delay to the exponentiation algorithm to confuse timing analysis."),
      bullet("Blinding: Multiply the cipher text by a random number before performing exponentiation."),
      sp(),

      // ============================================================
      // Q39
      // ============================================================
      hdr("Q39. Differentiate Between Certificate Based Authentication and Biometric Authentication."),
      sp(),
      twoColTable(
        ["Certificate Based Authentication", "Biometric Authentication"],
        [
          ["Works with 2-factor authentication (something you know + something you have).", "Works with 1-factor authentication based on something you are."],
          ["Uses a digital certificate created by a Certificate Authority (CA) containing the user's public key.", "Uses human characteristics such as fingerprint, voice, or iris pattern."],
          ["The user signs a random challenge with their private key; the server verifies using the public key from the stored certificate.", "A sample of biometric data is stored in the database and compared with the input during login."],
          ["Accuracy depends on cryptographic strength.", "Accuracy is governed by FAR (False Acceptance Rate) and FRR (False Rejection Rate)."],
          ["Requires certificate infrastructure (CA, key pairs, certificate storage).", "Requires biometric scanner hardware and a sample database."],
          ["More widely used in enterprise and internet security.", "Used in physical access control, mobile authentication, etc."]
        ]
      ),
      sp(),
      para("FAR (False Acceptance Rate): Probability that an unauthorized user is accepted by the system."),
      para("FRR (False Rejection Rate): Probability that an authorized user is rejected by the system."),
      sp(),

      // ============================================================
      // Q40
      // ============================================================
      hdr("Q40. Discuss Three Properties of Digital Signature."),
      sp(),
      para("A digital signature provides a set of security capabilities that would be difficult to implement in any other way. It is applicable in situations where there is no complete trust between sender and receiver. It is like a fingerprint and can only be implemented using Asymmetric Key (Public Key) Cryptography."),
      sp(),
      bold("Three Properties of Digital Signature:"),
      sp(),
      numbered("It must verify the author, date, and time of the signature. This ensures that the identity of the signer and the exact time of signing can be confirmed, preventing false claims about when a document was signed."),
      sp(),
      numbered("It must authenticate the contents at the time of the signature. This ensures that the document has not been tampered with after signing. Any change in the message will invalidate the signature."),
      sp(),
      numbered("It must be verifiable by a third party to resolve disputes. A trusted third party (such as a court or arbitrator) must be able to independently verify both the identity of the signer and the integrity of the signed document."),
      sp(),

      // ============================================================
      // Q41
      // ============================================================
      hdr("Q41. Discuss Five Requirements of Hash Function."),
      sp(),
      para("A hash function H accepts a variable size message M as input and produces a fixed size output (message digest or hash value). The requirements are:"),
      sp(),
      numbered("H can be applied to a block of data of any size. The hash function must accept input messages of any arbitrary length."),
      sp(),
      numbered("H produces a fixed length output. Regardless of the size of the input message, the output (hash value) is always of a fixed, predetermined size (e.g., 128 bits for MD5, 160 bits for SHA-1)."),
      sp(),
      numbered("H(x) is relatively easy to compute for any given x. Computing the hash value must be efficient in both hardware and software implementations."),
      sp(),
      numbered("One-Way Property (Pre-image Resistance): For any given hash value h, it is computationally infeasible to find x such that H(x) = h. This ensures that the original message cannot be recovered from its hash."),
      sp(),
      numbered("Weak Collision Resistance: For any given block x, it is computationally infeasible to find y != x such that H(y) = H(x). This prevents finding a different message that produces the same hash as a known message."),
      sp(),
      para("(6th requirement for completeness) Strong Collision Resistance: It is computationally infeasible to find any pair (x, y) such that H(x) = H(y). This is a stronger property ensuring no two messages share the same hash."),
      sp(),

      // ============================================================
      // Q42
      // ============================================================
      hdr("Q42. Explain RSA Algorithm in Detail. Calculate Public Key and Private Key for p = 5 and q = 13."),
      sp(),
      subHdr("RSA Algorithm"),
      para("RSA (Rivest, Shamir, Adleman) is a block cipher in which plaintext and ciphertext are integers between 0 and n-1 for some n. Typical size of n is 1024 bits."),
      sp(),
      para("Encryption: C = M^e mod n"),
      para("Decryption: M = C^d mod n"),
      para("Where: C = Ciphertext, M = Plaintext, e = encryption key, d = decryption key."),
      sp(),
      bold("Steps of RSA Algorithm:"),
      numbered("Select two prime numbers p and q."),
      numbered("Calculate n = p x q."),
      numbered("Calculate O(n) = (p-1)(q-1)."),
      numbered("Select e such that e is relatively prime to O(n) [i.e., gcd(e, O(n)) = 1]."),
      numbered("Determine d such that (d x e) mod O(n) = 1."),
      numbered("Public Key = {e, n} and Private Key = {d, n}."),
      sp(),
      subHdr("Key Calculation for p = 5, q = 13"),
      numbered("p = 5, q = 13"),
      numbered("n = 5 x 13 = 65"),
      numbered("O(n) = (5-1)(13-1) = 4 x 12 = 48"),
      numbered("Choose e = 11 (gcd(11, 48) = 1, since 11 is prime and does not divide 48)"),
      numbered("Determine d: (d x 11) mod 48 = 1. Testing: 11 x 35 = 385 = 8 x 48 + 1. So d = 35."),
      sp(),
      para("Public Key = {e, n} = {11, 65}"),
      para("Private Key = {d, n} = {35, 65}"),
      sp(),

      // ============================================================
      // Q43
      // ============================================================
      hdr("Q43. Explain the Working Mechanism of Kerberos Authentication Protocol with Neat Diagram."),
      sp(),
      para("Note: As explicitly mentioned in the lecture material, the lecture notes and diagram for the Kerberos Authentication Protocol are NOT included in the provided lecture material and must be obtained from class notes or the prescribed textbooks:"),
      bullet("Cryptography and Network Security by William Stallings"),
      bullet("Cryptography and Network Security by Atul Kahate"),
      sp(),
      para("Key points for Kerberos (from standard knowledge):"),
      bullet("Kerberos is a network authentication protocol that uses secret-key cryptography (symmetric key) and a trusted third-party authentication server."),
      bullet("It involves a Key Distribution Center (KDC) with two components: Authentication Server (AS) and Ticket Granting Server (TGS)."),
      bullet("The client first obtains a Ticket Granting Ticket (TGT) from the AS, then uses it to get service tickets from the TGS to access services."),
      bullet("All tickets are time-stamped and have a limited validity period, preventing replay attacks."),
      sp(),

      // ============================================================
      // Q44
      // ============================================================
      hdr("Q44. Differentiate Between MAC and Message Digest. Explain HMAC Algorithm with Neat Diagram."),
      sp(),
      subHdr("Part A: MAC vs Message Digest"),
      sp(),
      twoColTable(
        ["Message Authentication Code (MAC)", "Message Digest / Hash Function"],
        [
          ["Involves the use of a shared secret key.", "Does NOT use any shared secret key."],
          ["MAC = CK(M), where K is the shared secret key.", "h = H(M), where H is the hash function."],
          ["Provides both authentication and integrity.", "Provides integrity only (cannot authenticate sender without additional mechanism)."],
          ["Two parties (sender and receiver) must share the same key.", "Can be used by anyone without needing a shared key."],
          ["Examples: HMAC-MD5, HMAC-SHA1.", "Examples: MD5 (128-bit output), SHA-1 (160-bit output)."]
        ]
      ),
      sp(),
      subHdr("Part B: HMAC Algorithm"),
      para("HMAC (Hash-based Message Authentication Code) uses a message digest algorithm (MD5 or SHA-1) along with a secret key to produce an authentication code."),
      sp(),
      bold("Note: b = number of bits in a message block."),
      sp(),
      bold("Key Transformation Rule:"),
      bullet("If K = b: Transformed Key = K (no change)"),
      bullet("If K < b: Pad zeros to the left of K to get the Transformed Key of length b."),
      bullet("If K > b: Pass K through the message digest algorithm (MD5/SHA-1) to reduce it to b bits."),
      sp(),
      bold("Steps of HMAC Algorithm:"),
      numbered("XOR the Transformed Key with ipad (the string 00110110 repeated b/8 times) to produce S1."),
      numbered("Append the input message at the end of S1 and pass through the message digest algorithm (MD5 or SHA-1) to produce H."),
      numbered("XOR the Transformed Key with opad (the string 01011010 repeated b/8 times) to produce S2."),
      numbered("Append H (from Step 2) at the end of S2 and pass through the message digest algorithm (MD5 or SHA-1) to produce the final HMAC."),
      sp(),
      bold("HMAC Diagram (Textual Representation):"),
      sp(),
      new Paragraph({
        children: [new TextRun({ text: "Key (K)  -->  Transformed Key (K')", font: "Courier New", size: 20 })]
      }),
      new Paragraph({ children: [new TextRun({ text: "                    |", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "            XOR <-- ipad", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "                    |", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "                   S1 + Message", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "                    |", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "           [MD5 / SHA-1] --> H", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "                                 \\", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "Transformed Key (K') XOR opad --> S2 + H", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "                                  |", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "                        [MD5 / SHA-1] --> HMAC", font: "Courier New", size: 20 })] }),
      sp(),

      // ============================================================
      // Q45
      // ============================================================
      hdr("Q45. Explain the Working Mechanism of MD5 Algorithm in Detail."),
      sp(),
      para("MD5 (Message Digest 5) takes a variable length message as input and produces a fixed length message digest of 128 bits."),
      sp(),
      bold("Steps of MD5:"),
      sp(),
      numbered("Padding: Padding bits are added such that the length of the message is 64 bits less than an exact multiple of 512 bits. A single '1' bit is followed by the necessary number of '0' bits. Example: If the original message is 1000 bits long, 472 padding bits are added to make it 1472 bits (which is 64 bits less than 1536 = 512 x 3)."),
      sp(),
      numbered("Append Length: The length of the original message (excluding padding bits) is computed and appended to the output of Step 1, making the total length a multiple of 512 bits."),
      sp(),
      numbered("Divide Input into 512-bit Blocks: The padded and length-appended message is divided into blocks of 512 bits each."),
      sp(),
      numbered("Initialize Chaining Variables: Four 32-bit chaining variables are initialized: A = 01234567, B = 89ABCDEF, C = FEDCBA98, D = 76543210 (all in hexadecimal)."),
      sp(),
      numbered("Process Each 512-bit Block:"),
      bullet("Copy the four chaining variables into four corresponding variables: a = A, b = B, c = C, d = D. The combined abcd forms a single 128-bit register."),
      bullet("Divide the current 512-bit block into 16 sub-blocks of 32 bits each."),
      bullet("There are a total of 4 rounds. In each round, inputs are: all 16 sub-blocks, variables a, b, c, d, and constants t[k] (an array of 64 elements, 16 used per round)."),
      sp(),
      bold("Single Round Operation of MD5:"),
      sp(),
      new Paragraph({ children: [new TextRun({ text: "     a    b    c    d", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "          |", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "     P(b, c, d) <-- Process P (varies per round)", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "          |", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "     Add a  --> M[i] (message sub-block)", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "          |", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "     Add t[k] (constant)", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "          |", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "     Left Circular Shift by s bits", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "          |", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "     Add b --> New abcd for next iteration", font: "Courier New", size: 20 })] }),
      sp(),
      bold("Process P for each round:"),
      bullet("Round 1: P = (b AND c) OR ((NOT b) AND d)"),
      bullet("Round 2: P = (b AND d) OR (c AND (NOT d))"),
      bullet("Round 3: P = b XOR c XOR d"),
      bullet("Round 4: P = c XOR (b OR (NOT d))"),
      sp(),

      // ============================================================
      // Q46
      // ============================================================
      hdr("Q46. Discuss Requirements of Asymmetric Key Cryptography. Calculate Public Key and Private Key for p = 17 and q = 11."),
      sp(),
      subHdr("Requirements of Asymmetric Key (Public Key) Cryptography"),
      numbered("It is computationally easy for a sender/receiver to generate a pair of keys (Public key and Private key)."),
      numbered("It is computationally easy for a sender, knowing the public key and the message, to generate the corresponding ciphertext."),
      numbered("It is computationally easy for a receiver to decrypt the resulting ciphertext using the private key to recover the original message."),
      numbered("It is computationally infeasible for an opponent, knowing the public key, to determine the private key."),
      numbered("It is computationally infeasible for an opponent, knowing the public key and the ciphertext, to recover the original message."),
      numbered("The encryption and decryption functions can be applied in either order."),
      sp(),
      subHdr("RSA Key Calculation for p = 17, q = 11"),
      numbered("p = 17, q = 11"),
      numbered("n = 17 x 11 = 187"),
      numbered("O(n) = (17-1)(11-1) = 16 x 10 = 160"),
      numbered("Choose e = 7 (7 is prime and gcd(7, 160) = 1)"),
      numbered("Determine d: (d x 7) mod 160 = 1. Testing: 7 x 23 = 161 = 1 x 160 + 1. So d = 23."),
      sp(),
      para("Public Key = {e, n} = {7, 187}"),
      para("Private Key = {d, n} = {23, 187}"),
      sp(),

      // ============================================================
      // Q47
      // ============================================================
      hdr("Q47. Discuss the Working of Challenge-Response Authentication Token."),
      sp(),
      para("In a Challenge/Response Authentication Token, the authentication process involves the following steps:"),
      sp(),
      numbered("The user sends their User ID as a login request to the server."),
      sp(),
      numbered("The server, after validating the User ID, sends a random challenge (a random number generated using a pseudo-random number generation technique) which travels as plaintext to the user's computer."),
      sp(),
      numbered("The user gets a screen displaying the User ID, the random challenge, and a prompt for the password."),
      sp(),
      numbered("The user opens the authentication token using a PIN and keys in the random challenge into the token via the small keypad."),
      sp(),
      numbered("The token encrypts the random challenge using its pre-programmed seed value and displays the encrypted value (result) on its LCD display."),
      sp(),
      numbered("The user keys in the encrypted value shown on the token into the password field on the user computer's display screen."),
      sp(),
      numbered("The login request (with the encrypted response) is sent to the server. The server independently encrypts the original random challenge using the seed retrieved from the user database and compares it with the response received."),
      sp(),
      numbered("The server returns a success or failure message to the user based on the verification result."),
      sp(),
      bold("Limitation: This method has scope for mistakes as the user has to make multiple manual entries (keying in the challenge into the token, then keying in the result). Time-based tokens eliminate this drawback."),
      sp(),

      // ============================================================
      // Q48
      // ============================================================
      hdr("Q48. In an RSA System, p = 13, q = 17, and Public Key = 35. Calculate the Private Key."),
      sp(),
      numbered("p = 13, q = 17"),
      numbered("n = 13 x 17 = 221"),
      numbered("O(n) = (13-1)(17-1) = 12 x 16 = 192"),
      numbered("Public key e = 35 (given). Verify: gcd(35, 192) = 1. Since 35 = 5 x 7 and 192 = 2^6 x 3, they share no common factor. Valid."),
      numbered("Find d such that (d x 35) mod 192 = 1."),
      sp(),
      para("Using Extended Euclidean Algorithm:"),
      para("192 = 5 x 35 + 17"),
      para("35  = 2 x 17  + 1"),
      para("Back-substitution: 1 = 35 - 2 x 17"),
      para("                    = 35 - 2 x (192 - 5 x 35)"),
      para("                    = 11 x 35 - 2 x 192"),
      para("So d = 11 (mod 192)."),
      sp(),
      para("Verification: 35 x 11 = 385 = 2 x 192 + 1. Correct."),
      sp(),
      para("Private Key = {d, n} = {11, 221}"),
      sp(),

      // ============================================================
      // Q49
      // ============================================================
      hdr("Q49. Explain the Working Mechanism of Certificate Based Authentication in Detail."),
      sp(),
      para("Certificate based authentication is a stronger authentication mechanism as compared to password based authentication. It works with 2-factor authentication (password/PIN + digital certificate)."),
      sp(),
      bold("Steps of Certificate Based Authentication:"),
      sp(),
      numbered("Creation, Storage and Distribution of Digital Certificates: Digital certificates are created by a Certificate Authority (CA) — an organization trusted by the people (e.g., RBI in India) — for each user and sent to the respective users. A copy of the certificate is also stored by the server in its database. The digital certificate contains the public key of the respective user."),
      sp(),
      numbered("Login Request: The user sends their User ID to the server."),
      sp(),
      numbered("Server Creates a Random Challenge: The server, after validating the User ID, sends a random challenge (a random number generated using a pseudo-random number generation technique), which travels as plaintext to the user's computer."),
      sp(),
      numbered("User Signs the Random Challenge: The user signs the random challenge using their private key (encryption) and sends the encrypted random challenge to the server. The server decrypts the random challenge using the user's public key, obtained from the digital certificate stored in the server's database."),
      sp(),
      numbered("Server Returns an Appropriate Message: The server matches the decrypted random challenge with the original random challenge. If the match is successful, the user is authenticated and the server returns a success message. Otherwise, a failure message is returned."),
      sp(),

      // ============================================================
      // Q50
      // ============================================================
      hdr("Q50. Explain Single Round Operation of MD5 Algorithm in Detail with Neat Diagram."),
      sp(),
      para("Each 512-bit block in MD5 is processed through 4 rounds. Each round processes all 16 sub-blocks (32 bits each). The single round operation is described below:"),
      sp(),
      bold("Inputs to each step within a round:"),
      bullet("Variables a, b, c, d (32-bit each, forming a 128-bit register)"),
      bullet("M[i]: a 32-bit message sub-block"),
      bullet("t[k]: a 32-bit constant (from the t array)"),
      sp(),
      bold("Steps of Single Round Operation:"),
      sp(),
      numbered("A process P is performed on variables b, c, and d. P varies in each round:"),
      bullet("Round 1: P = (b AND c) OR ((NOT b) AND d)"),
      bullet("Round 2: P = (b AND d) OR (c AND (NOT d))"),
      bullet("Round 3: P = b XOR c XOR d"),
      bullet("Round 4: P = c XOR (b OR (NOT d))"),
      sp(),
      numbered("Variable a is added to the output of P."),
      numbered("The current 32-bit message sub-block M[i] is added to the output of Step 2."),
      numbered("The constant t[k] is added to the output of Step 3."),
      numbered("The output of Step 4 is left circular shifted by s bits (s changes in each iteration)."),
      numbered("Variable b is added to the output of Step 5."),
      numbered("The output after Step 6 becomes the new value of abcd for the next step/round."),
      sp(),
      bold("Single Round Diagram:"),
      sp(),
      new Paragraph({ children: [new TextRun({ text: "[ a ]  [ b ]  [ c ]  [ d ]", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "         |      |      |", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "         +--[ P ]------+", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "               |", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "          Add  [a]", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "               |", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "          Add  [M[i]]  <-- message sub-block", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "               |", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "          Add  [t[k]]  <-- constant", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "               |", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "      Left Circular Shift by s bits", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "               |", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "          Add  [b]", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "               |", font: "Courier New", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "    New [a, b, c, d] for next step", font: "Courier New", size: 20 })] }),
      sp(),

      // ============================================================
      // Q51
      // ============================================================
      hdr("Q51. Calculate the Message Digest for: (i) 6392542 (ii) 5351795"),
      sp(),
      para("Note: The lecture material provided does not include a specific simplified hand-computation method for calculating MD5 message digests for numeric inputs. MD5 involves complex multi-round bitwise operations on binary representations that are not feasibly done by hand. This question likely refers to a simplified hash algorithm or specific example demonstrated in class. Please refer to your class notes for the specific method taught for this calculation."),
      sp(),
      para("For reference, the general MD5 process for an input would be:"),
      numbered("Convert the number to its ASCII/binary representation."),
      numbered("Apply padding, append length, divide into 512-bit blocks."),
      numbered("Process through 4 rounds of 16 steps each using the MD5 operations (P functions, circular shifts, and additions)."),
      numbered("The final 128-bit output is expressed as a 32-character hexadecimal string."),
      sp(),

      // ============================================================
      // Q52
      // ============================================================
      hdr("Q52. Explain the Working Mechanism of Biometric Authentication in Detail."),
      sp(),
      para("Biometric authentication works on unique human characteristics such as fingerprint, voice, or the pattern of lines in the iris of the eye."),
      sp(),
      bold("Working Mechanism:"),
      sp(),
      numbered("Sample Storage: The user database contains a sample of the user's biometric characteristics (e.g., a fingerprint scan, voice recording, or iris scan), collected during registration."),
      sp(),
      numbered("Authentication Attempt: During login, the user is required to provide another sample of their biometric characteristics through an appropriate scanner (fingerprint reader, microphone, camera, etc.)."),
      sp(),
      numbered("Matching Process: The system compares the newly provided sample with the stored sample. If both samples match to the expected degree (based on the configured threshold values of FAR and FRR), the user is considered authenticated."),
      sp(),
      bold("Two Configurable Parameters:"),
      sp(),
      bullet("FAR (False Acceptance Rate): The probability that a user who should be rejected (i.e., an unauthorized user) is actually accepted by the system. A lower FAR means higher security."),
      bullet("FRR (False Rejection Rate): The probability that a user who should be accepted (i.e., an authorized user) is actually rejected by the system. A lower FRR means better user convenience."),
      sp(),
      para("There is a trade-off between FAR and FRR. Increasing the strictness of matching reduces FAR (fewer impostors accepted) but increases FRR (more legitimate users rejected), and vice versa. The optimal threshold (Equal Error Rate) is where FAR = FRR."),
      sp(),

      // ============================================================
      // Q53
      // ============================================================
      hdr("Q53. Discuss Multi-Factor Authentication."),
      sp(),
      para("Multi-factor authentication (MFA) requires the user to present two or more pieces of evidence (factors) to verify their identity. Factors fall into three categories:"),
      sp(),
      bullet("Something you know (knowledge factor): e.g., password or PIN"),
      bullet("Something you have (possession factor): e.g., identity card, digital certificate, or authentication token"),
      bullet("Something you are (inherence factor): e.g., voice, fingerprint, or iris scan (biometric)"),
      sp(),
      bold("Types of Multi-Factor Authentication:"),
      sp(),
      subHdr("One-Factor Authentication"),
      para("Uses only one factor, typically something you know. Example: A simple username and password login. This is the least secure form."),
      sp(),
      subHdr("Two-Factor Authentication (2FA)"),
      para("Combines two different factors. Example: Password (something you know) + OTP from an authentication token or digital certificate (something you have). Certificate-based authentication is an example of two-factor authentication and is stronger than simple password authentication."),
      sp(),
      subHdr("Three-Factor Authentication"),
      para("Combines all three factors: something you know (password/PIN), something you have (authentication device or digital certificate), and something you are (biometric characteristic such as voice or fingerprint). This is the most secure form of authentication."),
      sp(),
      para("Multi-factor authentication significantly reduces the risk of unauthorized access because even if one factor is compromised (e.g., password is stolen), the attacker still needs to defeat the other factors."),
      sp(),

      // ============================================================
      // Q54
      // ============================================================
      hdr("Q54. Differentiate Between Weak Password, Strong Password and Random Password with Examples."),
      sp(),
      para("Note: The lecture material states 'Refer to textbooks already mentioned in class' for this topic. The standard definitions are as follows:"),
      sp(),
      twoColTable(
        ["Type", "Description and Example"],
        [
          ["Weak Password", "A password that is easy to guess or crack. It is short, uses only one type of character (letters or digits), or is a common dictionary word. Example: 'password', '123456', 'abc', 'john'. Easily broken by dictionary attacks or brute force."],
          ["Strong Password", "A password that is difficult to guess or crack. It is long (8+ characters), uses a mix of uppercase and lowercase letters, digits, and special characters. Example: 'Tr@v3L!99#Sky'. Resists dictionary and brute force attacks."],
          ["Random Password", "A password generated randomly by a system or password manager, with no meaningful pattern or relation to the user. It is the most secure type but hardest to remember. Example: 'xQ7#mR2!vL9@kP'. Generated using a cryptographically secure pseudo-random number generator."]
        ]
      ),
      sp(),
      bold("Password Policy Recommendations:"),
      bullet("Minimum length of 8-12 characters."),
      bullet("Must include uppercase, lowercase, digits, and special characters."),
      bullet("Should not contain the user's name, username, or dictionary words."),
      bullet("Should be changed periodically."),
      bullet("Should not be reused across multiple accounts."),
      sp(),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("INF3202_Answers_Q37_to_Q54.docx", buf);
  console.log("Done");
});