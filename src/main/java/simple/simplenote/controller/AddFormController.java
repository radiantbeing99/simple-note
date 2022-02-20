package simple.simplenote.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AddFormController {

    @Transactional(readOnly = false)
    @GetMapping("/add")
    public void addCard() {

    }

}
