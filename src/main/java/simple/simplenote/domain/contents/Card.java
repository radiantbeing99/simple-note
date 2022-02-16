package simple.simplenote.domain.contents;


import lombok.Getter;
import lombok.Setter;
import simple.simplenote.domain.CardList;

import javax.persistence.*;

@Entity
@Getter @Setter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype")
public abstract class Card {

    @Id @GeneratedValue
    @Column(name = "card_id")
    private Long id;


    @Enumerated(EnumType.STRING)
    private CardStatus cardStatus;
}
