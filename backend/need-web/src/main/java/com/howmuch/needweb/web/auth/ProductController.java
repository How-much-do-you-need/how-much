package com.howmuch.needweb.web.auth;


import com.howmuch.needweb.service.ButtonService;
import com.howmuch.needweb.service.MemberService;
import com.howmuch.needweb.service.ProductService;
import com.howmuch.needweb.vo.Button;
import com.howmuch.needweb.vo.Member;
import com.howmuch.needweb.vo.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    @Autowired
    ButtonService buttonService;

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
    @PutMapping("update")
    public void update(@RequestBody Product product) throws Exception{
        System.out.println("update product = " + product);
        if(!productService.update(product)){
            throw new Exception("상품 정보 변경 오류입니다.");
        }
    }
    @PostMapping("updatePrice")
    public void updatePrice(@RequestBody Product product, @RequestParam("id") String id) throws Exception{
        if(!productService.updatePrice(product)){
            throw new Exception("가격 정보 변경 오류입니다.");
        }
    }


    @DeleteMapping("delete")
    public void productDelete(@RequestBody Product product) throws Exception{
        System.out.println("prod_no = " + product.getProd_no());
        if(!productService.productDelete(product.getProd_no())){
            throw new Exception("상품 삭제 오류입니다.");
        }
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

    // 버튼 로직
    @PostMapping("button")
    public boolean insertButton(@RequestParam("id") String id, @RequestParam("prod_no") int prod_no) throws Exception{
        System.out.println("id  = " +id); // 버튼을 누른 사람의 ID
        System.out.println("prod_no = " + prod_no); // 버튼 눌린 게시글
        System.out.println("buttonService.findButton(id, prod_no) = " + buttonService.findButton(id, prod_no));
        if(buttonService.findButton(id, prod_no) == 0) {
            buttonService.makeBtnColumn(id, prod_no);
        }
        return buttonService.checkCurrentBtn(id, prod_no);
    }
    @PostMapping("pushButton")
    public void pushButton(@RequestBody Button button) throws Exception{
        System.out.println("button = " + button);
        buttonService.updateBtnStatus(button);
    }

//    @GetMapping("buttonStatus")
//    public boolean buttonStatus(@RequestParam("id") String id, @RequestParam("prod_no") int prod_no) throws Exception {
//        System.out.println("id = " + id);
//        System.out.println("prod_no = " + prod_no);
//        // 로그인한 사용자, 상품 번호
//        return buttonService.checkCurrentBtn(id, prod_no);
//    }




}
