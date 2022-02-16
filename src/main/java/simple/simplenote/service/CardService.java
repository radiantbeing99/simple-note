package simple.simplenote.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simple.simplenote.domain.CardList;
import simple.simplenote.domain.contents.Card;
import simple.simplenote.repository.CardRepository;
import simple.simplenote.repository.ListRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;


    @Transactional(readOnly = false)
    public Long add(Card card){
        validateDuplicatedId(card);
        cardRepository.save(card);
        return card.getId();
    }

    private void validateDuplicatedId(Card card) {
        List<Card> idResult = cardRepository.findById(card.getId());
        if (!idResult.isEmpty()){
            throw new IllegalStateException("duplicated ID number");
        }

    }
}
