class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    _autocomplete(node, prefix, results) {
        if (node.isEndOfWord) {
            results.push(prefix);
        }
        for (let char in node.children) {
            this._autocomplete(node.children[char], prefix + char, results);
        }
    }

    autocomplete(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }
        let results = [];
        this._autocomplete(node, prefix, results);
        return results;
    }
}

// Example usage
const trie = new Trie();
const words = ["hello", "hell", "heaven", "heavy"];
for (let word of words) {
    trie.insert(word);
}

document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value;
    const results = trie.autocomplete(query);
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = '';
    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result;
        resultsElement.appendChild(li);
    });
});
