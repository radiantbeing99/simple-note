package simple.simplenote.domain.contents;


import lombok.Getter;
import lombok.Setter;
import simple.simplenote.domain.CardList;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@Getter @Setter
@DiscriminatorValue("Picture")
public class Picture extends CardList {
    private String copyRight;
    private String pictureName;
}
