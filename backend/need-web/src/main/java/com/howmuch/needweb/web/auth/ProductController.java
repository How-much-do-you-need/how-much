package com.howmuch.needweb.web.auth;


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
    ProductService productService;

    @GetMapping("list")
    public void list(Model model) throws Exception{
        System.out.println("Product List");
        model.addAttribute("products", productService.list());
    }
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
    @GetMapping("detail")
    public void detail(int prod_no, Map map) throws Exception{
        Product product = productService.get(prod_no);

        if (product == null){
            throw new Exception("해당 게시물은 존재하지 않습니다.");
        }

        map.put("product", product);
    }

    @PostMapping("update")
    public String update(Product product) throws Exception{
        if(!productService.update(product)){
            throw new Exception("상품 정보 변경 오류입니다.");
        }
        return "redirect:list";
    }

    @GetMapping("delete")
    public String delete(int prod_id) throws Exception{
        if(!productService.delete(prod_id)){
            throw new Exception("상품 삭제 오류입니다.");
        }
        return "redirect:list";
    }

    @PostMapping("findName/{id}")
    @ResponseBody
    public String findId(@PathVariable("id") String id)  throws Exception {
        Map<String, String> map = new HashMap();
        map.put("id", id);
        System.out.println(id);
        List<Product> product = productService.searchWriter(id);
        System.out.println(product.size());
        if (product == null) {
            return "게시물이 존재하지 않습니다.";
        }
        return product.toString();
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
}
