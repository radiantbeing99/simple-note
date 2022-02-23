package simple.simplenote.repository;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import simple.simplenote.domain.contents.Card;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CardRepository {

    private final EntityManager em;

    public void save(Card card) {
        em.persist(card);
    }

    public List<Card> findAll() {
        return em.createQuery("select c from Card as c", Card.class)
                .getResultList();
    }

    public Card findById(Long id) {
        Card card = null;
        try {
            card = em.createQuery("select c from Card as c where c.id= :id", Card.class)
                    .setParameter("id", id)
                    .getSingleResult();
        } catch (Exception e) {
            System.out.println("None Exist Id");
        }
        finally {
            return card;
        }
    }

}
