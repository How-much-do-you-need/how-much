package com.howmuch.needweb.member;


import com.howmuch.needweb.WebConfig;
import com.howmuch.needweb.service.MemberService;
import com.howmuch.needweb.vo.Member;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import static org.assertj.core.api.Assertions.assertThat;

public class MemberServiceTest {

    @Test
    void findMember() throws Exception {
        ApplicationContext ac = new AnnotationConfigApplicationContext(WebConfig.class);
        MemberService memberService = ac.getBean(MemberService.class);
        Member member = memberService.get("user1");

        assertThat(member.getGender()).isEqualTo(1);

    }


}
