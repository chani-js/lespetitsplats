class BinarySearch {

    constructor() {
        // racine de l'arbre binaire vide au depart 
        this.root = null;
    }

    // insertion des données
    insert(data) {
        //initialisation et creation du noeud
        var newtree = new BinaryTree(data)

        if (this.root === null)
            this.root = newtree
        else
            this.insertNode(this.root, newtree)
    }
    insertNode(node, newtree) {
            if (newtree.data < node.data) {
                if (node.left === null)
                    node.left = newtree
                else
                    this.insertNode(node.left, newtree)
            } else {
                if (node.right === null)
                    node.right = newtree
                else
                    this.insertNode(node.right, newtree)
            }
        }
        // remove(data)


    // Helper function
    // findMinNode()
    findMinNode(node) {
            if (node.left === null)
                return node;
            else
                return this.findMinNode(node.left);
        }
        // getRootNode()
    getRootNode() {
            return this.root;
        }
        // recherche infixe, produit un classement dans l'ordre
    inorder(node) {
            if (node !== null) {
                this.inorder(node.left);
                console.log(node.data);
                this.inorder(node.right);
            }
        }
        // preorder(node)  
    preorder(node) {
            if (node !== null) {
                console.log(node.data);
                this.preorder(node.left);
                this.preorder(node.right);
            }
        }
        // postorder(node)
    postorder(node) {
            if (node !== null) {
                this.postorder(node.left);
                this.postorder(node.right);
                console.log(node.data);
            }
        }
        // search(node, data)
    search(node, data) {
        // si l'arbre est vide retourne null
        if (node === null)
            return null;

        // si les données sont inférieures aux données du nœud
        // va a gauche
        else if (data < node.data)
            return this.search(node.left, data);

        // si les données sont inférieures aux données du nœud
        // va a droite
        else if (data > node.data)
            return this.search(node.right, data);

        // si les données sont egales aux données du noeud
        // return node
        else
            return node;
    }



}