package simple.simplenote.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import simple.simplenote.service.ListService;

@Controller
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AddFormController {
    private final ListService listService;



    @Transactional(readOnly = false)
    @GetMapping("/add")
    public void addCard() {

    }

}
