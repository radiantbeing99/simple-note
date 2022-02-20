package simple.simplenote.domain.contents;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype")
public abstract class Card {


    @Id @GeneratedValue
    @Column(name = "card_id")
    private Long id;

    private String title;

    @Enumerated(EnumType.STRING)
    private CardStatus cardStatus;

    private LocalDateTime lastModifiedTime;
}
