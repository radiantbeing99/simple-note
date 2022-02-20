package simple.simplenote.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import simple.simplenote.domain.contents.Card;
import simple.simplenote.domain.contents.Text;
import simple.simplenote.service.CardService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AddFormController extends HttpServlet {

    private final CardService cardService;
    private ObjectMapper objectMapper = new ObjectMapper();


    @Transactional(readOnly = false)
    @GetMapping("/add")
    public String addCard() throws JsonProcessingException {

        Text text = new Text();
        text.setTitle("코로롱");
        text.setContents("이히리기우구추");
        cardService.add(text);

        String result = objectMapper.writeValueAsString(text);

        System.out.println("AddFormController.addCard");
        return result;
    }

}
