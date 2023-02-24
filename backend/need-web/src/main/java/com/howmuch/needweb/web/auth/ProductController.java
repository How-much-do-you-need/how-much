package com.howmuch.needweb.web.auth;


import com.howmuch.needweb.service.MemberService;
import com.howmuch.needweb.service.ProductService;
import com.howmuch.needweb.vo.Member;
import com.howmuch.needweb.vo.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.StringReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/product/")
public class ProductController {

    @Autowired
    MemberService memberService;
    @Autowired
    ProductService productService;

    @GetMapping("all")
    public List<Product> list() throws Exception{
        System.out.println("Product List");
        return productService.list();
    }
    @PostMapping("write")
    public void write(@RequestBody Product product) throws Exception {
        System.out.println("product = " + product);
        productService.insert(product);
    }
    @PostMapping("detail")
    public Product detail(int prod_no) throws Exception{
        Product product = productService.get(prod_no);

        if (product == null){
            throw new Exception("해당 게시물은 존재하지 않습니다.");
        }

        return product;
    }

    @PostMapping("update")
    public String update(Product product) throws Exception{
        if(!productService.update(product)){
            throw new Exception("상품 정보 변경 오류입니다.");
        }
        return "redirect:list";
    }

    @PostMapping("updatePrice")
    public void updatePrice(@RequestBody Product product) throws Exception{
        if(!productService.updatePrice(product)){
            throw new Exception("가격 정보 변경 오류입니다.");
        }
        return;
        //return "redirect:list";
    }
    @GetMapping("delete")
    public String delete(int prod_id) throws Exception{
        if(!productService.delete(prod_id)){
            throw new Exception("상품 삭제 오류입니다.");
        }
        return "redirect:list";
    }

    @PostMapping("findName")
    @ResponseBody
    public List<Product> findId(String id)  throws Exception {
        Map<String, String> map = new HashMap();
        map.put("id", id);
        List<Product> product = productService.searchWriter(id);
        if (product == null) {
            System.out.println("게시물이 존재하지 않습니다.");
            return null;
        }
        return product;
    }

    /*
    @PostMapping("insert")
    public String join(String email, String phoneNo, Member member, Model model) throws Exception {
        // 가입정보가 제대로된 정보인지 확인
        if (email.length() < 5 || phoneNo.length() < 5) {
            System.out.println("email = " + email);
            System.out.println("phoneNo = " + phoneNo);
            return "/auth/register1";
        }

        // 가입정보가 중복인지 확인하고 문제없다면 가입처리
        if(memberService.join(email, phoneNo, member)) {
            return "/auth/joinResult";
        }

        // 이 외의 모든 올바르지 않은 가입정보에 대해 가입정보 재입력 강제하기
        model.addAttribute("checkResult", "false");
        return "/auth/register";
    }
    */

    @GetMapping("price")
    public priceUpdate(Product product, int price) {
        productService.priceUpdate(price);
    }
}
