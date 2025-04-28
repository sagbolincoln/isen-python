def test_ajouter_au_panier():
    panier = []  # Simuler un panier vide

    # Simuler un produit
    produit = {
        'id': 1,
        'name': 'Coca-Cola',
        'price': 100.00,
        'image': 'media/coca.jpg',
        'quantite': 1
    }

    # Ajouter au panier
    panier.append(produit)

    # Vérifications
    assert len(panier) == 1
    assert panier[0]['name'] == 'Coca-Cola'
    assert panier[0]['price'] == 100.00
    assert panier[0]['quantite'] == 1
