Date: March 25, 2026

<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/828c5903-b163-4943-96ed-5d77f11f8ac8" />

In the digital world, security is paramount, and nowhere is this more critical than with user passwords. When we create an 
account and set a password, we often assume that password is stored exactly as we typed it. However, in a well-designed 
system, this is far from the truth. Instead, our passwords undergo a process called hashing.

Password hashing is a one-way cryptographic function that transforms a password into a fixed-size string of characters,
known as a hash. The key here is "one-way"—you can easily generate a hash from a password, but you cannot reverse the 
process to get the original password back from the hash. This is a fundamental security measure. If a database is ever 
compromised, attackers will only get these hashes, not the actual passwords.

But simply hashing isn't enough. A common attack called a "rainbow table" tries to pre-compute hashes for common passwords. 
To combat this, we introduce salting. A unique, randomly generated string called a "salt" is added to each password before 
it's hashed. This means even if two users have the exact same password, their hashes will be different because their salts 
are different. The salt is stored alongside the hash in the database.

Beyond salting, we also consider the computational cost of hashing. Older, faster algorithms like MD5 or SHA-1 are no 
longer suitable for passwords because modern computers can crack them too quickly. We now use algorithms specifically 
designed to be slow and computationally intensive, such as bcrypt, scrypt, or Argon2. This slowness is a feature, not a bug, 
making brute-force attacks economically unfeasible for attackers.

As web designers, while we might not be implementing these hashing algorithms ourselves, understanding their importance is 
crucial. It informs our discussions with backend developers, helps us design secure user flows, and ultimately contributes 
to building trust with our users by protecting their most sensitive information. This invisible layer of security is a 
cornerstone of responsible web development.
