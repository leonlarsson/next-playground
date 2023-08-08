CREATE TABLE guestbook_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    body VARCHAR(100) NOT NULL,
    name VARCHAR(50) DEFAULT NULL,
    email VARCHAR(150) DEFAULT NULL,
    edited_at DATETIME DEFAULT NULL,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE guestbook_edits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entry_id INT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    old_message VARCHAR(100) NOT NULL,
    new_message VARCHAR(100) NOT NULL,
    edited_by VARCHAR(150) DEFAULT NULL
);