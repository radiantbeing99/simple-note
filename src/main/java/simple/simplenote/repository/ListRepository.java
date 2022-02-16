package simple.simplenote.repository;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import simple.simplenote.domain.CardList;
import simple.simplenote.domain.contents.Card;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ListRepository {

    private final EntityManager em;

    public void save(CardList cardList){
        em.persist(cardList);
    }

    public List<CardList> findAll(){
        return em.createQuery("select c from CardList as c", CardList.class)
                .getResultList();
    }

    public List<CardList> findById(Long id){
        return em.createQuery("select c from CardList as c where c.id =: id", CardList.class)
                .setParameter("id", id)
                .getResultList();
    }

    public List<CardList> findByTitleName(String titleName){
        return em.createQuery("select c from CardList as c where c.title =: titleName", CardList.class)
                .setParameter("titleName", titleName)
                .getResultList();
    }
}
